// import { useState,useContext,createContext } from "react";

// const AuthContext=createContext()

// const AuthProvider=({children})=>{
//     const[auth,setAuth]=useState({
//         user:null,
//         token:"",
//     });
//     return(
//         <AuthContext.Provider value={[auth,setAuth]}>
//         {children}
//         </AuthContext.Provider>
//     )
// }

// const useAuth=()=>createContext(AuthContext)

// export {useAuth,AuthProvider}

import axios from "axios";
import { createContext, useState, useEffect} from "react";


export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [ auth, setAuth ] = useState({ user: null, token: '' });

    axios.defaults.headers.common['Authorization']=auth?.token

    useEffect(()=>{
        const data=localStorage.getItem('auth')
        if(data){
            const parseData=JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
        }
    },[])
        
    return (
        <DataContext.Provider value={{ 
           auth,
           setAuth
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;