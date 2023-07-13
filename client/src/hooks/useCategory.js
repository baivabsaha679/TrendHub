import { useState,useEffect } from "react";
import axios from "axios";


export default function useCategory(){
    const[categories,setCategories]=useState([]);
    
    const getCategories=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/getAllCategories`)
            setCategories(data?.categories)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getCategories()
    },[]);

    return categories;
}