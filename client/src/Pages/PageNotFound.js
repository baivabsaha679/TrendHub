import { Box, Typography, Button, styled } from "@mui/material"

import { Link } from "react-router-dom"

import Layout from "../components/Layout/Layout"

const StyledBox=styled(Box)`
   width:100%;
   height:80vh;
   display:flex;
   justify-content:center;
   flex-direction:column;
   align-items:center;
`

const PageNotFound=()=>{
    return(
        <Layout>
            <StyledBox>
                <Typography variant="h1">404</Typography>
                <Typography>Oops!Page Not Found</Typography>
                <Link to={'/'}>
                    <Button variant="outlined" style={{marginTop:10}}>Go Back</Button>
                </Link>
            </StyledBox>
        </Layout>
    )
}
export default PageNotFound