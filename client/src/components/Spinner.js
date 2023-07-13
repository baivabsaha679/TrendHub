import { Box, Typography, Button, styled } from "@mui/material"
import {Warning as Warn} from '@mui/icons-material';
import { Link } from "react-router-dom"

const Container=styled(Box)`
   width:100%;
   height:100vh;
   display:flex;
   flex-direction:column;
   align-items:center;
   justify-content:center;
`
const Symbol=styled(Warn)`
   width:100%;
   height:30vh;
`

const Spinner=()=>{
    return(
        <Container>
            <Symbol/>
            <Typography variant="h4">Unauthorized Access</Typography>
            location.state=location.sta
            <Link to={'/login'} style={{marginTop:10}}><Button variant="standard" style={{fontWeight:600}}>Go Back</Button></Link>
        </Container>
    )
}
export default Spinner