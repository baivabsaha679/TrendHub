import { Box, AppBar,Toolbar,Typography,Button,Menu,MenuItem,styled } from "@mui/material"
import { useState, useContext } from "react";
import {Link} from 'react-router-dom'
import Badge from '@mui/material/Badge';
import { useCart } from "../../context/CartProvider"
import { DataContext } from "../../context/DataProvider";
import useCategory from "../../hooks/useCategory"


const StyledBox=styled(Box)(({theme})=>({
    display:'flex',
    margin:'auto',
    alignItems:'center',
    '& > *':{
       color:'inherit',
       marginRight:30,
       fontSize:16,
       textDecoration:'none'
    },
    [theme.breakpoints.down('md')]:{
        display:'block',
        '& > *':{
           display:'block',
           marginTop:12,
        },
    }
}));

const StyledMenu=styled(Menu)`
   margin-top:4px;
`
const StyledLink=styled(Link)`
   text-decoration:none;
   color:inherit;
`

const Buttons=()=>{
    const {auth,setAuth}=useContext(DataContext)
    const [cart]=useCart()
    const[open,setOpen]=useState(false)
    const[opencat,setOpencat]=useState(false)
    const categories=useCategory()

    const logout=()=>{
        setAuth({
            ...auth,
            user:null,
            token:""
        })
        localStorage.removeItem("auth")
        alert('Logout Successful')
    }
    const handleClick=(event)=>{
        setOpen(event.currentTarget)
    };
    const handleClose=()=>{
        setOpen(false)
    };
    const handleClickCat=(event)=>{
        setOpencat(event.currentTarget)
    };
    const handleCloseCat=()=>{
        setOpencat(false)
    };

    return(
        <StyledBox>
            <Link to='/'>Home</Link>
                    
            <Link onClick={handleClickCat}>Categories</Link>
            <StyledMenu
                anchorEl={opencat}
                open={Boolean(opencat)}
                onClose={handleCloseCat}

            >
                <MenuItem onClick={()=>{handleCloseCat()}}>
                    <StyledLink to={`/categories`}>All Categories</StyledLink>
                </MenuItem>
                {
                    categories?.map(c=>{
                        return(
                            <MenuItem onClick={()=>{handleCloseCat()}}>
                                <StyledLink to={`/category/${c.slug}`}>{c.name}</StyledLink>
                            </MenuItem>
                        )
                    })
                }
            </StyledMenu>
            
            {
                !auth.user ? (
                    <>
                        <Link to='/register'>Register</Link>
                        <Link to='/login'>Login</Link>
                    </>
                ) : (
                    <>
                        <Link onClick={handleClick}>{auth?.user?.name}</Link>
                        <StyledMenu
                            anchorEl={open}
                            open={Boolean(open)}
                            onClose={handleClose}

                        >
                            <MenuItem onClick={()=>{handleClose()}}>
                                <StyledLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin':'user'}`}>Dashboard</StyledLink>
                            </MenuItem>
                            <MenuItem onClick={()=>{handleClose();logout();}}>
                                <StyledLink to='/login'>Logout</StyledLink>
                            </MenuItem>
                        </StyledMenu>
                    </>
                )
            }
            <Badge badgeContent={cart?.length} color="primary">
                <Link to='/cart' style={{textDecoration:'none',color:'inherit'}}>Cart</Link>
            </Badge>
        </StyledBox>
    )
}
export default Buttons