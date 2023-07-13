import { useState,useEffect,useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import axios from "axios";
import { Outlet,useNavigate } from "react-router-dom";
import Spinner from '../Spinner'


const PrivateRoute=()=>{
   const[ok,setOk]=useState(false)
   const{auth,setAuth}=useContext(DataContext)
   const navigate=useNavigate()

   useEffect(()=>{
      const authCheck=async()=>{
        const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/user-auth`)
        if(response.data.ok)setOk(true)
        else setOk(false)
      }
      if(auth?.token)authCheck()
   },[auth?.token])

   return ok? <Outlet/> : <Spinner/>

}
export default PrivateRoute