import {Box,TextField, Button, styled, Typography} from '@mui/material'
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
    margin: 20px auto;
    margin-top:40px;
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
    answer:'',
    newPassword:''
}

const ForgotPassword=()=>{
    const url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiVsz8w9YDfLYtHSkbAdn-a21Rahre3FmsKRwNc8XkCSkRop7LC3YrzzjdDUxnkF7G7w&usqp=CAU'
    const[user,setUser]=useState(initialValues)
    const navigate=useNavigate()

    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const changePassword=async()=>{
        try{
            let response=await axios.post(`${process.env.REACT_APP_BASE_URL}/forgot-password`,user)
            if(response && response.data.success){
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
                            <TextField variant='standard' label='Enter Email' value={user.email} name='email' onChange={(e)=>onInputChange(e)}/>
                            <TextField variant='standard' label='Enter the name of your first school' value={user.answer} name='answer' onChange={(e)=>onInputChange(e)}/>
                            <TextField variant='standard' label='Enter New Password' value={user.newPassword} name='newPassword' onChange={(e)=>onInputChange(e)}/>
                            <SignUpButton onClick={()=>changePassword()}>Submit</SignUpButton>
                        </Wrapper>
                    </Box>
                </Component>
            </MainBox>
        </Layout>
    )
}
export default ForgotPassword