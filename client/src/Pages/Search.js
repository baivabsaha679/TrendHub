import {Box,Typography,Grid,Button,styled} from '@mui/material'
import Layout from "../components/Layout/Layout"
import { useContext } from 'react'
import { SearchContext } from '../context/SearchProvider'

const Text=styled(Typography)`
   text-align:center;
   margin:10px;
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

const Search=()=>{
    const{values,setValues}=useContext(SearchContext)
    return(
        <Layout>
            <Box>
                <Text variant='h4'>Search results</Text>
                <Text>{values?.results.length < 1? 'No Products found':`Found ${values?.results.length}`}</Text>
            </Box>
            <Grid container style={{marginTop:'5vh',marginBottom:'5vh'}}>
                    {
                        values?.results.map(product=>{
                            return(
                                <Grid item lg={3} sm={4} xs={12}>
                                        <Container>
                                            <Image src={`${process.env.REACT_APP_BASE_URL}/product-photo/${product._id}`} alt={product.name} />
                                            <Text>{product.name}</Text>
                                            <Details>{product.description.substring(0,30)}...</Details>
                                            <Details>$ {product.price}</Details>
                                            <StyledBox>
                                                <Button variant="contained" style={{background:'grey'}}>More Deatils</Button>
                                                <Button variant="contained" >Add to Cart</Button>
                                            </StyledBox>
                                        </Container>
                                </Grid>
                            )
                        })
                    }
                
                </Grid>
        </Layout>
    )
}
export default Search