import slugify from 'slugify'
import product from '../models/product.js'
import fs from 'fs'
import category from '../models/category.js'
import braintree from 'braintree'
import dotenv from 'dotenv'
import Order from '../models/Order.js'

dotenv.config()

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProduct=async(request,response)=>{
    try{
       const {name,slug,description,price,category,quantity,shipping}=request.fields
       const {photo}=request.files
      
       if(!name)return response.status(404).send({error:'Name is required'})
       if(!description)return response.status(404).send({error:'Description is required'})
       if(!price)return response.status(404).send({error:'Price is required'})
       if(!category)return response.status(404).send({error:'Category is required'})
       if(!quantity)return response.status(404).send({error:'Quantity is required'})
       if(photo && photo.size > 1000000)return response.status(404).send({error:'Photo is required and need to be less than 10mb'})

       const newProduct=new product({...request.fields,slug:slugify(name)})
       if(photo){
          newProduct.photo.data=fs.readFileSync(photo.path)
          newProduct.photo.contentType=photo.type
       }
       await newProduct.save()
       return response.status(200).send({
          success:true,
          message:'Product added successfully',
          newProduct
       })
    }
    catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:'Error while creating product',
            error
        })
    }
}

export const getProduct=async(request,response)=>{
    try{
        const products=await product.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        return response.status(200).send({
            success:true,
            message:'All products fetched',
            total:products.length,
            products
        })
    }
    catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:'Error while fetching all products',
            error
        })
    }
}

export const getSingleProduct=async(request,response)=>{
    try{
        const singleProduct=await product.findOne({slug:request.params.slug}).populate('category').select("-photo")
        return response.status(200).send({
            success:true,
            message:'Single product fetched',
            singleProduct
        })
    }
    catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:'Error while fetching single product',
            error
        })
    }
}

export const getProductPhoto=async(request,response)=>{
    try{
        const product_photo=await product.findById(request.params.pid).select("photo")
        if(product_photo.photo.data){
            response.set('Content-type',product_photo.photo.contentType)
            return response.send(product_photo.photo.data)
        }

    }
    catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:'Error while fetching product photo',
            error
        })
    }
}

export const deleteProduct=async(request,response)=>{
    try{
        await product.findByIdAndDelete(request.params.pid).select("-photo")
        response.status(200).send({
            success:true,
            message:'Product deleted successfully'
        })
    }
    catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:'Error while deleting product',
            error
        })
    }
}

export const updateProduct=async(request,response)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping}=request.fields
        const {photo}=request.files
       
        if(!name)return response.status(404).send({error:'Name is required'})
        if(!description)return response.status(404).send({error:'Description is required'})
        if(!price)return response.status(404).send({error:'Price is required'})
        if(!category)return response.status(404).send({error:'Category is required'})
        if(!quantity)return response.status(404).send({error:'Quantity is required'})
        if(photo && photo.size > 1000000)return response.status(404).send({error:'Photo is required and need to be less than 10mb'})
 
        const newProduct=await product.findByIdAndUpdate(request.params.pid,
            {...request.fields,slug:slugify(name)},{new:true}
        )
        if(photo){
           newProduct.photo.data=fs.readFileSync(photo.path)
           newProduct.photo.contentType=photo.type
        }
        await newProduct.save()
        return response.status(200).send({
           success:true,
           message:'Product updated successfully',
           newProduct
        })
    }
    catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:'Error while updating product',
            error
        })
    }
}

export const productFilter=async(request,response)=>{
    try{
        const{checked,radio}=request.body
        let args={}
        if(checked.length > 0)args.category=checked
        if(radio.length)args.price = {$gte : Number(radio.split(',')[0]), $lte : Number(radio.split(',')[1])}
        const products=await product.find(args)
        return response.status(200).send({
            success:true,
            products
        })
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:"Error while filtering product",
            error
        })
    }
}

export const productCount=async(request,response)=>{
    try{
        const total=await product.find({}).estimatedDocumentCount()
        response.status(200).send({
            success:true,
            total
        })
    }
    catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:'Error in product count',
            error
        })
    }
}

export const productList=async(request,response)=>{
    try{
        const perPage=4
        const page=request.params.page ? request.params.page : 1
        const products=await product.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1})
        response.status(200).send({
            success:true,
            products
        })
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:'Error in per page request',
            error
        })
    }
}

export const searchProduct=async(request,response)=>{
    try{
        const {keyword}=request.params
        const results=await product.find({
            $or:[
                {name:{$regex :keyword, $options:"i"}},
                {description:{$regex :keyword, $options:"i"}}
            ]
        }).select("-photo")
        response.json(results)
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:true,
            message:'Error in search product function',
            error

        })
    }
}

export const productCategory=async(request,response)=>{
    try{
        const Category=await category.findOne({slug:request.params.slug})
        const products=await product.find({category:Category}).populate('category')
        response.status(200).send({
            success:true,
            Category,
            products
        })
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:'Error while fetching products with given category',
            error
        })
    }
}

export const braintreeToken=async(req,res)=>{
    try{
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err)
            }
            else{
                res.send(response)
            }
        })
    }
    catch(error){
        console.log(error)
    }
}

export const braintreePayment=async(request,response)=>{
    try{
        const {cart,nonce,user}=request.body
        let total=0
        cart.map((i) => {total+=i.price})
        let newTransaction=gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        },
        function(error,result){
            if(result){
                const order=new Order({
                    products:cart,
                    payment:result,
                    buyer:user._id
                }).save()
                response.json({ok:true})
            }
            else{
                response.status(500).send(error)
            }
        }
        )
    }
    catch(error){
        console.log(error)
    }
}