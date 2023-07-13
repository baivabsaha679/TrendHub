import User from '../models/user.js'
import Order from '../models/Order.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'



dotenv.config()

export const signupUser=async(request,response)=>{
    try{
        // const name=request.body.name;
        // const email=request.body.email;
        // const password=request.body.password;
        // const phone=request.body.phone;
        // const address=request.body.address;
        const {name,email,password,phone,address,answer}=request.body
       
        if(!name)return response.send({message:'Name is required'})
        if(!email)return response.send({message:'Email is required'})
        if(!password)return response.send({message:'Password is required'})
        if(!phone)return response.send({message:'Phone is required'})
        if(!address)return response.send({message:'Address is required'})
        if(!answer)return response.send({message:'Answer is required'})


        const exist=await User.findOne({email:email})
        if(exist)return response.status(401).send({
            success:false,
            message:'Already registered'
        })

        const hashedPassword=await bcrypt.hash(request.body.password,10)
        const user={name:name,email:email,password:hashedPassword,phone:phone,address:address,answer:answer}
  
        const newUser=new User(user)
        await newUser.save()
  
        return response.status(200).send({
            success:true,
            message:'Signup successful',
            user
        })
    }
    catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:"Error in registration",
            error
        })
    }
}

export const loginUser=async(request,response)=>{
    try{
        const {email,password}=request.body
        if(!email || !password){
            return response.status(404).send({
                success:false,
                message:'Invalid Email or Password'
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return response.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        let match=await bcrypt.compare(password,user.password)
        if(!match){
            return response.status(404).send({
                success:false,
                message:'Invalid Password'
            })
        }
        let token=jwt.sign({_id:user._id},process.env.ACCESS_SECRET_KEY,{expiresIn:'7d'})
        response.status(200).send({
            success:true,
            message:'Login Successful',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token
        })
    }
    catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
}

export const forgotPassword=async(request,response)=>{
   try{
        const {email,answer,newPassword}=request.body
        if(!email)return response.status(404).send({message:'Email is required'})
        if(!answer)return response.status(404).send({message:'Answer is required'})
        if(!newPassword)return response.status(404).send({message:'New Password is required'})

        const user=await User.findOne({email});
        if(!user){
            response.status(404).send({
                success:false,
                message:'Wrong email or answer'
            })
        }
        const hashedPassword=await bcrypt.hash(newPassword,10)
        await User.findByIdAndUpdate(user._id,{password:hashedPassword})
        return response.status(200).send({
            success:true,
            message:'Password reset successfully'
        })
   }
   catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
   }
}

export const testy=(request,response)=>{
    response.send('Test succ')
}

export const updateProfile=async(request,response)=>{
    try{
        const {name,email,password,address,phone}=request.body
        const user=await User.findById(request.user._id)
        if(password && password.length < 6){
            return response.json({error:'Password is required and atleast 6 character long'})
        }
        const hashedPassword=password ? await bcrypt.hash(password,10) : undefined
        const updatedUser=await User.findByIdAndUpdate(request.user._id,{
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        },{new:true})
        return response.status(200).send({
            success:true,
            message:'Profile updated successfully',
            updatedUser
        })
    }
    catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:'Error while updating profile',
            error
        })
    }
}

export const getOrders=async(request,response)=>{
    try{
        const orders=await Order.find({buyer:request.user._id}).populate('products','-photo').populate('buyer','name')
        response.json(orders)
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:'Error while getting orders',
            error
        })
    }
}

export const getAllOrders=async(request,response)=>{
    try{
        const orders=await Order.find({}).populate('products','-photo').populate('buyer','name').sort({createdAt:"-1"})
        response.json(orders)
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:'Error while getting all orders',
            error
        })
    }
}

export const orderStatus=async(request,response)=>{
    try{
        const {orderId}=request.params
        const {status}=request.body
        const orders=await Order.findByIdAndUpdate(orderId,{status},{new:true})
        response.json(orders)
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:'Error while updating order status',
            error
        })
    }
}