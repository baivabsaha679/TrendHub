import {Grid, Box,TextField,Button,styled, Typography} from '@mui/material'
import Layout from "../../components/Layout/Layout"
import UserMenu from './UserMenu'
import { useState,useEffect } from 'react'
import { useContext } from 'react'
import { DataContext } from '../../context/DataProvider'
import axios from 'axios'

const Container=styled(Box)`
   width:100%;
   margin:10px auto;
`

const MainBox=styled(Box)`
   display:flex;
   align-items:center;
   justify-content:center;
`

const Component=styled(Box)`
    width: 400px;
    margin:0 auto;
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

const initialValues={
    name:'',
    email:'',
    password:'',
    phone:'',
    address:'',
}

const Profile=()=>{
    const url='https://trendhub.ca/cdn/shop/files/Asset_4_2x_3b4898f6-2028-4290-8e1c-cadfd7a4c4ae.png?v=1683028988&width=600'
    const {auth,setAuth}=useContext(DataContext)
    const[user,setUser]=useState(initialValues)

    useEffect(()=>{
        setUser({...user,name:auth?.user?.name,email:auth?.user?.email,phone:auth?.user?.phone,address:auth?.user?.address})
    },[])

    const signup=async()=>{
        try{
            const {data}=await axios.put(`${process.env.REACT_APP_BASE_URL}/profile`,user)
            if(data?.error){
                alert(data?.error)
            }
            else{
                setAuth({...auth,user:data?.updatedUser})
                let ls=localStorage.getItem('auth')
                ls=JSON.parse(ls)
                ls.user=data.updatedUser
                localStorage.setItem("auth",JSON.stringify(ls))
                alert('Profile updated successfully')
            }
        }
        catch(error){
            console.log(error);
            alert('Something went wrong!!!')
        }
    }
    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    return(
        <Layout>
            <Grid container style={{marginTop:'10vh'}}>
                <Grid item lg={2} sm={2} xs={12}>
                   <UserMenu/>
                </Grid>
                <Grid container item xs={12} sm={9} lg={9} style={{marginLeft:10}}>
                    <Container>
                        <MainBox>
                            <Component>
                                <Box>
                                    <Image src={url} alt='Logo'/>
                                    <Wrapper>
                                        <TextField variant='standard' label='Enter Name' value={user.name} name='name' onChange={(e)=>onInputChange(e)}/>
                                        <TextField variant='standard' label='Enter Email' value={user.email} name='email' onChange={(e)=>onInputChange(e)} disabled/>
                                        <TextField variant='standard' label='Enter Password' value={user.password} name='password' onChange={(e)=>onInputChange(e)}/>
                                        <TextField variant='standard' label='Enter Phone' value={user.phone} name='phone' onChange={(e)=>onInputChange(e)}/>
                                        <TextField variant='standard' label='Enter Address' value={user.address} name='address' onChange={(e)=>onInputChange(e)}/>
                                        <SignUpButton onClick={()=>signup()}>Update Profile</SignUpButton>
                                    </Wrapper>
                                </Box>
                            </Component>
                        </MainBox>
                    </Container>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Profile