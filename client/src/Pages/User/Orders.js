import {Grid, Box, Typography, Table, TableHead, TableBody, TableRow, TableCell,styled} from '@mui/material'
import Layout from "../../components/Layout/Layout"
import UserMenu from './UserMenu'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import { DataContext } from '../../context/DataProvider'
import moment from 'moment'

const Container=styled(Box)`
    display:flex;
    width:100%;
    margin:10px 5px;
    justify-content:space-between;
    align-items:center;
    border:1px solid #878787;
`
const StyledBox=styled(Box)`
    display:flex;
    flex-direction:column;
    width:100%;
    margin:10px 10px;
    align-items:center;
`
const Image=styled('img')({
    width:'100%',
    borderRadius:'10px 10px 10px 10px',
    objectFit:'cover',
    height:150,
    padding:'5px 5px'
})

const RightBox=styled(Box)(({theme})=>({
    [theme.breakpoints.down('xs')]:{
        '& > *':{
            overflow:'overlay',
        }
    }
}))

const Orders=()=>{
    const{auth,setAuth}=useContext(DataContext)
    const [orders,setOrders]=useState([])

    const getOrders=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/orders`)
            setOrders(data)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(auth?.token)getOrders()
    },[auth?.token])

    return(
        <Layout>
            <Grid container style={{marginTop:'10vh'}}>
                <Grid item lg={2} sm={2} xs={12}>
                   <UserMenu/>
                </Grid>
                <Grid container item xs={12} sm={9} lg={9} style={{marginLeft:10}}>
                    <RightBox>
                        <Typography variant='h5' style={{textAlign:'center'}}> All Orders</Typography>
                        {
                            orders?.map((o,i)=>{
                                return(
                                    <Box>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Buyer</TableCell>
                                                    <TableCell>Orders</TableCell>
                                                    <TableCell>Payment</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{o?.status}</TableCell>
                                                    <TableCell>{o?.buyer?.name}</TableCell>
                                                    <TableCell>{moment(o?.createdAt).fromNow()}</TableCell>
                                                    <TableCell>{o?.payment?.success ? "Success":"Failed"}</TableCell>
                                                    <TableCell>{o?.products?.length}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                        <StyledBox>
                                            {
                                                o?.products?.map((product,i)=>{
                                                    return(
                                                        <Container>
                                                            <Grid container item lg={6} sm={12} xs={12}>
                                                            <Image src={`${process.env.REACT_APP_BASE_URL}/product-photo/${product._id}`} alt={product.name} />
                                                            </Grid>
                                                            <Grid item lg={5} sm={12} xs={12}>
                                                                <Typography>{product.name}</Typography>
                                                                <Typography>{product.description.substring(0,30)}</Typography>
                                                                <Typography>Price: ${product.price}</Typography>
                                                            </Grid>
                                                        </Container>
                                                    )
                                                })
                                            }
                                        </StyledBox>
                                    </Box>
                                )
                            })
                        }
                    </RightBox>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Orders