import { Box, Typography,Grid,Button,styled } from "@mui/material"
import Layout from "../components/Layout/Layout"
import { useState,useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const Image=styled('img')({
    width:'70%',
    borderRadius:'10px 10px 0 0',
    objectFit:'cover',
    height:'80%',
    margin:'0 60px',
    border:'1px solid #878787'
})

const StyledBox=styled(Box)`
   display:flex;
   flex-direction:column;
   & > p,& > button{
      margin:10px 0;
   }
`

const ProductDetails=()=>{
    const params=useParams()
    const [product,setProduct]=useState({})

    useEffect(()=>{
        if(params?.slug)getProduct()
    },[params?.slug])

    const getProduct=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/${params.slug}`)
            console.log(data)
            setProduct(data?.singleProduct)
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <Layout>
           <Grid container style={{marginTop:'15vh'}}>
                <Grid container item lg={6} sm={6} xs={12}>
                    <Image src={`${process.env.REACT_APP_BASE_URL}/product-photo/${product._id}`} alt={product.name} />
                </Grid>
                <Grid container item xs={12} sm={6} lg={6}>
                    <StyledBox>
                        <Typography style={{fontSize:24,fontWeight:600}}>Product Details</Typography>
                        <Typography>Name: {product.name}</Typography>
                        <Typography>Description: {product.description}</Typography>
                        <Typography>Price: {product.price}</Typography>
                        <Typography>Category: {product?.category?.name}</Typography>
                        <Button variant="contained" >Add to Cart</Button>
                    </StyledBox>
                </Grid> 
            </Grid>
        </Layout>
    )
}
export default ProductDetails