import { Box, Typography,Grid, styled, Button, Divider } from "@mui/material"
import Layout from "../components/Layout/Layout"
import { useCart } from "../context/CartProvider"
import { DataContext } from "../context/DataProvider"
import { json, useNavigate } from "react-router-dom"
import { useContext, useState,useEffect } from "react"
import DropIn from "braintree-web-drop-in-react";
import axios from "axios"

const Heading=styled(Box)`
   display:flex;
   flex-direction:column;
   align-items:center;
   margin-top:80px;
`
const StyledBox=styled(Box)`
    display:flex;
    flex-direction:column;
    width:100%;
    margin:10px 10px;
    align-items:center;
`
const Container=styled(Box)`
    display:flex;
    width:100%;
    margin:10px 5px;
    justify-content:space-between;
    align-items:center;
    border:1px solid #878787;
`
const Image=styled('img')({
    width:'100%',
    borderRadius:'10px 10px 10px 10px',
    objectFit:'cover',
    height:150,
    padding:'5px 5px'
})

const Address=styled(Box)`
   display:flex;
   flex-direction:column;
   margin:20px 0;
   & > button{
      margin:15px 0;
   }
   
`

const CartPage=()=>{
    const[cart,setCart]=useCart()
    const{auth,setAuth}=useContext(DataContext)
    const[clientToken,setClientToken]=useState('')
    const[instance,setInstance]=useState('')
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()

    const removeItem=(pid)=>{
        try{
            let myCart=[...cart]
            let index=myCart.findIndex(item=>item._id === pid)
            myCart.splice(index,1)
            setCart(myCart)
            localStorage.setItem('cart',JSON.stringify(myCart))
        }
        catch(error){
            console.log(error)
        }
    }

    const totalPrice=()=>{
        try{
            let total=0
            cart?.map(item=>{total=total+item.price})
            return total.toLocaleString("en-US",{
                style:'currency',
                currency:'USD'
            })
        }
        catch(error){
            console.log(error)
        }
    }

    const getToken=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/braintree/token`)
            setClientToken(data?.clientToken)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getToken()
    },[auth?.token])

    const handlePayment = async () => {
        try {
          setLoading(true);
          const user=auth.user
          const { nonce } = await instance.requestPaymentMethod();
          const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/braintree/payment`, {
            nonce,
            cart,
            user,
          });
          setLoading(false);
          localStorage.removeItem("cart");
          setCart([]);
          navigate('/dashboard/user/orders');
          alert("Payment Completed Successfully ");
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

    return(
        <Layout>
            <Heading>
                <Typography>Hello <Typography variant="span" style={{fontWeight:600,fontSize:18}}>{auth?.token && auth?.user?.name}</Typography></Typography>
                <Typography>
                    {
                        cart?.length > 0 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : '. Please login to checkout'}`
                        :"Your cart is empty"
                    }
                </Typography>
            </Heading>
            <Grid container style={{marginTop:'5vh'}}>
                <Grid container item lg={6} sm={6} xs={12}>
                    <StyledBox>
                        {
                            cart?.map(product=>{
                                return(
                                    <Container>
                                        <Grid container item lg={6} sm={12} xs={12}>
                                           <Image src={`${process.env.REACT_APP_BASE_URL}/product-photo/${product._id}`} alt={product.name} />
                                        </Grid>
                                        <Grid item lg={5} sm={12} xs={12}>
                                            <Typography>{product.name}</Typography>
                                            <Typography>{product.description.substring(0,30)}</Typography>
                                            <Typography>Price: ${product.price}</Typography>
                                            <Button variant="contained" style={{background:'red',height:30,marginTop:10}} onClick={()=>removeItem(product._id)}>Remove</Button>
                                        </Grid>
                                    </Container>
                                )
                            })
                        }
                    </StyledBox>
                </Grid>
                <Grid container item  lg={6} sm={6} xs={12}>
                    <StyledBox>
                        <Typography variant="h4">Cart Summary</Typography>
                        <Typography>Total | Checkout | Payment</Typography>
                        <hr/>
                        <Typography variant="h5">Total : {totalPrice()}</Typography>
                        {
                            auth?.user?.address ? (
                                <Address>
                                    <Typography variant="h6">Current Address</Typography>
                                    <Typography variant="h6">{auth?.user?.address}</Typography>
                                    <Button variant="contained" style={{background:'Grey'}} onClick={()=>navigate('/dashboard/user/profile')}>Update Address</Button>
                                </Address>
                            ) : (
                                <Address>
                                {
                                    auth?.token ? (
                                        <Button variant="contained" onClick={()=>navigate('/dashboard/user/profile')}>Update Address</Button>
                                    ) : (
                                        <Button variant="contained" onClick={()=>navigate('/login',{state:'/cart'})}>Login to checkout</Button>
                                    )
                                }
                                </Address>
                            )
                        }
                        {
                            !clientToken || !auth?.token || !cart?.length ? (""):(
                                <>
                                    <DropIn
                                    options={{
                                        authorization:clientToken,
                                        paypal:{
                                            flow:'vault',
                                        },
                                    }}
                                    onInstance={(instance) => setInstance(instance)}
                                    />
                                    <Button variant="contained" onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>
                                        {loading ? 'Processing...':'Make Payment'}
                                    </Button>
                                </>
                            )
                        }
                    </StyledBox>
                </Grid> 
            </Grid>
        </Layout>
    )
}
export default CartPage