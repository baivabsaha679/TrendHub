import { Box,Grid, Typography,Button,styled } from "@mui/material"
import Layout from "../components/Layout/Layout"
import { useState,useEffect } from "react"
import axios from "axios"
import { useParams,useNavigate } from "react-router-dom"

const StyledTop=styled(Box)`
   diplay:flex;
   flex-direction:column;
   align-items:center;
   justify-content:center;
   & > p{
      text-align:center;
      font-size:20px;
   }
`
const Container=styled(Box)`
   border:1px solid #d3cede;
   border-radius:10px;
   margin:10px;
   height:300px;
   display:flex;
   flex-direction:column;
   align-items:center;
   & > p{
      padding:0 5px 5px 5px;
   }

`
const Image=styled('img')({
    width:'100%',
    borderRadius:'10px 10px 0 0',
    objectFit:'cover',
    height:150
})

const Text=styled(Typography)`
   color:#878787;
   font-size:12px;
`
const Details=styled(Typography)`
   font-size:14px;
   word-break:break-word;
`
const LoadBox=styled(Box)`
   width:100%;
   display:flex;
   margin:20px auto;
   justify-content:center;
`
const StyledBox=styled(Box)`
   display:flex;
   justify-content:space-evenly;
    & > button{
        width:45%;
        height:40px;
        font-size:12px;
        line-height:1.2;
    }
`

const CategoryProduct=()=>{
    const params=useParams()
    const navigate=useNavigate()
    const [products,setProducts]=useState([])
    const [category,setCategory]=useState([])
    
    useEffect(()=>{
        if(params?.slug)getProductByCat()
     },[params?.slug])

    const getProductByCat=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.Category)
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <Layout>
            <StyledTop>
                <Typography style={{fontWeight:600}}>Category : {category?.name}</Typography>
                <Typography style={{fontSize:14}}>{products?.length} result found</Typography>
            </StyledTop>
            <Grid container style={{marginTop:'3vh'}}>
                <Grid container item xs={12} sm={12} lg={12}>
                    {
                        products?.map(product=>{
                            return(
                                <Grid item lg={3} sm={4} xs={12}>
                                        <Container>
                                            <Image src={`${process.env.REACT_APP_BASE_URL}/product-photo/${product._id}`} alt={product.name} />
                                            <Text>{product.name}</Text>
                                            <Details>{product.description.substring(0,30)}...</Details>
                                            <Details>$ {product.price}</Details>
                                            <StyledBox>
                                                <Button variant="contained" style={{background:'grey'}} onClick={()=>navigate(`/product/${product.slug}`)}>More Deatils</Button>
                                                <Button variant="contained" >Add to Cart</Button>
                                            </StyledBox>
                                        </Container>
                                </Grid>
                            )
                        })
                    }
                </Grid> 
            </Grid>
        </Layout>
    )
}
export default CategoryProduct
