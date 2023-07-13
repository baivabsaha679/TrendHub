import { Box,Typography,Grid,styled, Button, Checkbox, FormGroup, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout/Layout"

import { DataContext } from "../context/DataProvider"
import { useCart } from "../context/CartProvider"
import { useContext,useState,useEffect } from "react"
import axios from "axios"
import { Prices } from "../components/Prices"

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
const Heading=styled(Typography)`
   font-size:18px;
   font-weight:600;
`
const Details=styled(Typography)`
   font-size:14px;
   word-break:break-word;
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
const LoadBox=styled(Box)`
   width:100%;
   display:flex;
   margin:20px auto;
   justify-content:center;
`

const Home=()=>{
    const navigate=useNavigate()
    const {auth,setAuth}=useContext(DataContext)
    const[cart,setCart]=useCart()
    const[products,setProducts]=useState([])
    const[categories,setCategories]=useState([])
    const[checked,setChecked]=useState([])
    const[radio,setRadio]=useState('')

    const[total,setTotal]=useState(0)
    const[page,setPage]=useState(1)
    const[loading,setLoading]=useState(false)

    const getAllCategory=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/getAllCategories`)
            if(data?.success){
                setCategories(data?.categories)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllCategory()
        getTotal()
    },[])

    const getAllProducts=async()=>{
        try{
            setLoading(true)
            const{data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/product-list/${page}`)
            getTotal()
            setLoading(false)
            setProducts(data.products)
        }
        catch(error){
            setLoading(false)
            console.log(error)
        }
    }

    
    const getTotal=async()=>{
        try{
            const{data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/product-count`)
            setTotal(data?.total)
        }
        catch(error){
            console.log(error)
        }
    }
    
    useEffect(()=>{
        if(page===1)return;
        loadMore()
    },[page])
    
    const loadMore=async()=>{
        try{
            setLoading(true)
            const{data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/product-list/${page}`)
            setLoading(false)
            setProducts([...products,...data?.products])
        }
        catch(error){
            setLoading(false)
            console.log(error)
        }
    }
    
    const handleFilter=(value,id)=>{
        let all=[...checked]
        if(value){
            all.push(id)
        }
        else{
            all=all.filter((c) => c !== id)
        }
        setChecked(all)
    }
    
    useEffect(()=>{
        if(!checked.length && !radio.length) getAllProducts()
    },[checked,radio])

    useEffect(()=>{
        if(checked.length || radio.length) filterProduct()
    },[checked,radio])

    const filterProduct=async()=>{
        try{
            const {data}=await axios.post(`${process.env.REACT_APP_BASE_URL}/product-filters`,{checked,radio})
            console.log(data)
            setTotal(data?.products.length)
            setProducts(data?.products)
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <Layout>
            <Grid container style={{marginTop:'15vh'}}>
                <Grid item lg={2} sm={2} xs={12}>
                    <Typography style={{textAlign:'center',width:'100%',fontWeight:600,color:'blue',fontSize:18,marginBottom:20}}>Filter by category</Typography>
                    {
                        categories?.map(c=>{
                            return(
                                <FormControlLabel key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)} control={<Checkbox />} label={c.name} style={{marginLeft:10,display:'block'}}/>
                            )
                        })
                    }
                    <Typography style={{textAlign:'center',width:'100%',fontWeight:600,color:'blue',fontSize:18,marginTop:20,marginBottom:20}}>Filter by Price</Typography>
                    <RadioGroup value={radio} onChange={(e)=>setRadio(e.target.value)}>
                    {
                        Prices?.map(p=>{
                            return(
                                <FormControlLabel key={p._id} control={<Radio />} label={p.name} value={p.array} style={{marginLeft:10}}/>
                            )
                        })
                    }
                    </RadioGroup>
                    <Button variant="contained" style={{width:'70%',fontSize:12,margin:'10px 20px'}} onClick={()=>window.location.reload()}>RESET FILTERS</Button>
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Typography style={{textAlign:'center',width:'100%',fontSize:24}}>All Products</Typography>
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
                                                <Button variant="contained" style={{background:'grey'}} onClick={()=>navigate(`product/${product.slug}`)}>More Deatils</Button>
                                                <Button variant="contained" onClick={()=>{
                                                    setCart([...cart,product]);
                                                    localStorage.setItem('cart',JSON.stringify([...cart,product]));
                                                    }}>Add to Cart</Button>
                                            </StyledBox>
                                        </Container>
                                </Grid>
                            )
                        })
                    }
                    <LoadBox>
                        {products && products.length < total && 
                           <Button variant="contained" style={{height:'50px'}} onClick={()=>setPage(page+1)}>{loading ? "Loading ...": "Load More"}</Button>
                        }
                    </LoadBox>
                </Grid> 
            </Grid>
        </Layout>
    )
}
export default Home