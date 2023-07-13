import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.js';

dotenv.config();

export const authenticateToken=(request,response,next)=>{
    try{
       const decode=jwt.verify(request.headers.authorization,process.env.ACCESS_SECRET_KEY)
       request.user=decode
       next()
    }
    catch(error){
        console.log(error)
    }
}

export const isAdmin=async(request,response,next)=>{
    try{
        const user=await User.findById(request.user._id)
        if(user.role !== 1){
            response.status(401).send({
                success:false,
                message:'Unauthorized Access'
            })
        }
        else next()
    }
    catch(error){
        console.log(error)
        response.status(401).send({
            success:false,
            message:'Error in admin middleware',
            error
        })
    }
}