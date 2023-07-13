import {Box,TextField, Button, styled, Typography} from '@mui/material'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from '../../context/DataProvider'

const MainBox=styled(Box)`
   display:flex;
   align-items:center;
   justify-content:center;
`

const Component=styled(Box)`
    width: 400px;
    margin: 20px auto;
    margin-top:60px;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`

const Wrapper=styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column; 
    flex: 1;
    & > div,& > button,& > p{
        margin-top:20px;
    }
`

const SignUpButton=styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874f0;
    height:40px;
    border-radius:2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Image=styled('img')({
    width:'70%',
    height:'10vh',
    margin:'auto',
    display:'flex',
    padding:'30px 0'
})
const Text=styled(Typography)`
   margin-top:15px;
   color:#878787;
   text-align:center;
`

const initialValues={
    email:'',
    password:''
}

const Login=()=>{
    const url='https://trendhub.ca/cdn/shop/files/Asset_4_2x_3b4898f6-2028-4290-8e1c-cadfd7a4c4ae.png?v=1683028988&width=600'
    const[user,setUser]=useState(initialValues)
    const navigate=useNavigate()
    const{auth,setAuth}=useContext(DataContext)

    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const login=async()=>{
        try{
            let response=await axios.post(`${process.env.REACT_APP_BASE_URL}/login`,user)
            if(response && response.data.success){
                alert(response.data.message)
                setAuth({
                    ...auth,
                    user:response.data.user,
                    token:response.data.token
                })
                localStorage.setItem("auth",JSON.stringify(response.data))
                navigate('/')
            }
            else{
                alert(response.data.message)
            }
        }
        catch(error){
            console.log(error);
            alert('Something went wrong!!!')
        }
    }

    return(
        <Layout>
            <MainBox>
                <Component>
                    <Box>
                        <Image src={url} alt='Logo'/>
                        <Wrapper>
                            <TextField variant='standard' label='Enter Email' value={user.email} name='email' onChange={(e)=>onInputChange(e)}/>
                            <TextField variant='standard' label='Enter Password' value={user.password} name='password' onChange={(e)=>onInputChange(e)}/>
                            <SignUpButton onClick={()=>login()}>Login</SignUpButton>
                            <Link to={'/forgotPassword'} style={{textDecoration:'none'}}>
                               <Text>Forgot Password?</Text>
                            </Link>
                        </Wrapper>
                    </Box>
                </Component>
            </MainBox>
        </Layout>
    )
}
export default Login