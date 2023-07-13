import {AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, ListItem, Button, ListItemButton, ButtonBase, styled} from '@mui/material'
import Buttons from './Buttons'

import { useState } from 'react'

import {Link} from 'react-router-dom'

import {Menu} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


import SearchInput from "../Form/SearchInput"

const StyledAppBar=styled(AppBar)`
   background:#000;
   height:65px;
`
const StyledBox=styled(Link)`
   display:flex;  
   margin-left:6%;
   line-height:0;
   text-decoration:none;
   color:inherit;
`
const StyledButtons=styled(Box)(({theme})=>({
   margin:'auto 3%',
   [theme.breakpoints.down('md')]:{
      display:'none'
   }
}))

const Menuicon=styled(Menu)(({theme})=>({
   display:'none',
   [theme.breakpoints.down('md')]:{
      display:'block'
   }
}))

const Header=()=>{

   const[open,setOpen]=useState(false)

   const handleOpen=()=>{
      setOpen(true);
   }
   const handleClose=()=>{
      setOpen(false)
   }

   return(
      <StyledAppBar>
         <Toolbar style={{minHeight:65}}>

            <IconButton color='inherit' onClick={handleOpen}>
                  <Menuicon/>
            </IconButton>

            <Drawer open={open} onClose={handleClose}>
               <Box style={{width:200}} >
                  <List>
                  <ListItem>
                     <Button component="li">
                        <Buttons/>
                     </Button>
                  </ListItem>
                  </List>
               </Box>
            </Drawer>

            <StyledBox>
               <ShoppingCartIcon/>
               <Typography style={{fontWeight:600,fontSize:20,marginLeft:5}}>TrendHub</Typography>
            </StyledBox>

            <SearchInput/>

            <StyledButtons>
               <Buttons/>
            </StyledButtons>

         </Toolbar>
      </StyledAppBar>
   )
}
export default Header