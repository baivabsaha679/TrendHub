import {Box,Typography,TextField, Button, styled} from '@mui/material'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MainBox=styled(Box)`
   display:flex;
   align-items:center;
   justify-content:center;
`

const Component=styled(Box)`
    width: 400px;
    margin:10px  auto;
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
const Text=styled(Typography)`
    font-size:28px;
    font-weight:600;
    color:blue;
    text-align:center;
    padding-top:20px;
`
const Image=styled('img')({
    width:'70%',
    height:'10vh',
    margin:'auto',
    display:'flex',
    padding:'30px 0'
})

const initialValues={
    name:'',
    email:'',
    password:'',
    phone:'',
    address:'',
    answer:''
}

const Register=()=>{
    const url='https://trendhub.ca/cdn/shop/files/Asset_4_2x_3b4898f6-2028-4290-8e1c-cadfd7a4c4ae.png?v=1683028988&width=600'
    const[user,setUser]=useState(initialValues)
    const navigate=useNavigate()

    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const signup=async()=>{
        try{
            let response=await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`,user)
            if(response.data.success){
                alert(response.data.message)
                navigate('/login')
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
                            <TextField variant='standard' label='Enter Name' value={user.name} name='name' onChange={(e)=>onInputChange(e)}/>
                            <TextField variant='standard' label='Enter Email' value={user.email} name='email' onChange={(e)=>onInputChange(e)}/>
                            <TextField variant='standard' label='Enter Password' value={user.password} name='password' onChange={(e)=>onInputChange(e)}/>
                            <TextField variant='standard' label='Enter Phone' value={user.phone} name='phone' onChange={(e)=>onInputChange(e)}/>
                            <TextField variant='standard' label='Enter Address' value={user.address} name='address' onChange={(e)=>onInputChange(e)}/>
                            <TextField variant='standard' label="What's the name of your first school?" value={user.answer} name='answer' onChange={(e)=>onInputChange(e)}/>
                            <SignUpButton onClick={()=>signup()}>Register</SignUpButton>
                        </Wrapper>
                    </Box>
                </Component>
            </MainBox>
        </Layout>
    )
}
export default Register