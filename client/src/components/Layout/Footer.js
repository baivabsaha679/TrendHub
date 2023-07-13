import {Box, Typography, styled} from '@mui/material'
import { Link } from 'react-router-dom'

const Container=styled(Box)`
   width:100%;
   padding:15px 0;
   background-color:#000000;
   color:#fff;
   display:flex;
   flex-direction:column;
   align-items:center;
`
const StyledBox=styled(Box)`
   & > a{
      margin:10px;
      color:#fff;
      text-decoration:none;
   }
`

const Footer=()=>{
    return(
        <Container>
           <Typography>All Rights Reserved &copy; TrendHub</Typography>
            <StyledBox>
                <Link to={'/about'}>About</Link>|
                <Link to={'/contact'}>Contact</Link>|
                <Link to={'/policy'}>Privacy Policy</Link>
            </StyledBox>
        </Container>
    )
}
export default Footer