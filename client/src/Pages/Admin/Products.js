import { Box, Typography,Grid,styled } from "@mui/material"
import Layout from "../../components/Layout/Layout"
import AdminMenu from "./AdminMenu"
import { useState,useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Container=styled(Box)`
   border:1px solid #d3cede;
   border-radius:10px;
   margin:10px;
   height:250px;
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
const Heading=styled(Typography)`
   font-size:18px;
   font-weight:600;
`
const Details=styled(Typography)`
   font-size:14px;
   word-break:break-word;
`

const Products=()=>{
    const [products,setProducts]=useState([])
    const getAllProducts=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product`)
            setProducts(data.products)
        }
        catch(error){
            console.log(error)
            alert('Something went wrong')
        }
    }

    useEffect(()=>{
        getAllProducts()
    },[])

    return(
        <Layout>
            <Grid container style={{marginTop:'15vh'}}>
                <Grid item lg={2} sm={2} xs={12}>
                    <AdminMenu/>
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
           
                     {
                        products?.map(product=>{
                            return(
                                <Grid item lg={3} sm={4} xs={12}>
                                    <Link  key={product.id} to={`/dashboard/admin/product/${product.slug}`} style={{textDecoration:'none', color:'inherit'}}>
                                        <Container>
                                            <Image src={`${process.env.REACT_APP_BASE_URL}/product-photo/${product._id}`} alt={product.name} />
                                            <Text>{product.name}</Text>
                                            <Details>{product.description}</Details>
                                        </Container>
                                    </Link>
                                </Grid>
                            )
                        })
                     }
                </Grid>    
            </Grid>
        </Layout>
    )
}
export default Products