import { useContext } from "react"
import { SearchContext } from "../../context/SearchProvider"
import { Box, Button, TextField,styled } from "@mui/material"
import axios from "axios"
import { useNavigate,Link } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';

const StyledBox=styled(Box)`
   display:flex;
   flex-direction:row;
   margin-left:auto;
`
const Text=styled(TextField)`
   background:#fff;
//    width:50vh;
`
// const StyledButton=styled(Button)`
//    width:100px;
//    height:40px;
//    margin:auto 10px;
// `
const StyledIcon=styled(Link)`
    display:flex;
    align-items:center;
    margin-left:10px;
    color:inherit;
`

const SearchInput=()=>{
    const navigate=useNavigate()
    const{values,setValues}=useContext(SearchContext)
   
    const handleSearch=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/search/${values.keyword}`)
            setValues({...values,results:data})
            navigate('/search')
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <StyledBox>
            <Text size="small" variant="outlined" label='Search Products' value={values.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value})}/>
            {/* <StyledButton variant="contained" onClick={handleSearch}></StyledButton> */}
            <StyledIcon onClick={handleSearch}>
               <SearchIcon/>
            </StyledIcon>
        </StyledBox>
    )
}
export default SearchInput