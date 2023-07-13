import category from '../models/category.js'
import slugify from 'slugify'

export const createCategory=async(request,response)=>{
    try{
        const{name}=request.body
        if(!name)return response.status(404).send({message:'Name is required'})

        const exist=await category.findOne({name})
        if(exist)return response.status(404).send({success:false,message:'Category already exist'})

        const newCategory=await new category({name,slug:slugify(name)})
        newCategory.save()
        return response.status(200).send({
            success:true,
            message:'Category created successfully',
            newCategory
        })
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:'Error in create category',
            error
        })
    }
}

export const updateCategory=async(request,response)=>{
    try{
        const {name}=request.body
        const {id}=request.params
        
        const newCategory=await category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})

        return response.status(200).send({
            success:true,
            message:'Category updated successfully',
            newCategory
        })
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:'Error in update category',
            error
        })
    }
}

export const getAllCategories=async(request,response)=>{
    try{
       const categories=await category.find({})
       return response.status(200).send({
          success:true,
          message:'Fetched all categories',
          categories
       })
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:'Error while fetching categories',
            error
        })
    }
}

export const getCategory=async(request,response)=>{
    try{
        const cat=await category.findOne({slug:request.params.slug})
        return response.status(200).send({
            success:true,
            message:'Got single category successfully',
            cat
        })
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:'Error while fetching single category',
            error
        })
    }
}

export const deleteCategory=async(request,response)=>{
    try{
        const {id}=request.params
        await category.findByIdAndDelete(id)
        return response.status(200).send({
            success:true,
            message:'Category deleted successfully'
        })
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:'Error while deleting category',
            error
        })
    }
}