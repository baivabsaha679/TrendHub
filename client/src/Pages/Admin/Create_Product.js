import {Grid, Box, Typography,TextField,Autocomplete,styled,TextareaAutosize,FormControl,MenuItem,InputLabel,Select, Button} from '@mui/material'
import Layout from "../../components/Layout/Layout"
import AdminMenu from './AdminMenu'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const StyledBox=styled(Box)`
   margin-top:20px;
   margin-bottom:20px;
   width:800px;
   display:flex;
   flex-direction:column;
   flex:1;
   & > div,& > p,& > input{
    margin-top:20px;
   }
`

const Create_Product=()=>{
    const navigate=useNavigate()

    const[categories,setCategories]=useState([])
    const[name,setName]=useState('')
    const[category,setCategory]=useState('')
    const[description,setDescription]=useState('')
    const[price,setPrice]=useState('')
    const[quantity,setQuantity]=useState('')
    const[shipping,setShipping]=useState('')
    const[photo,setPhoto]=useState('')

    const getAllCategory=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}/getAllCategories`)
            if(data?.success){
                setCategories(data?.categories)
            }
        }
        catch(error){
            console.log(error)
            alert('Something went wrong while fetching all categories')
        }
    }

    useEffect(()=>{
        getAllCategory()
    },[])

    const handleCreate=(e)=>{
        try{
            const productData=new FormData()
            productData.append("name",name)
            productData.append("description",description)
            productData.append("price",price)
            productData.append("quantity",quantity)
            productData.append("photo",photo)
            productData.append("category",category)
            productData.append("shipping",shipping)

            const{data}=axios.post(`${process.env.REACT_APP_BASE_URL}/create-product`,productData)
            if(data?.success){
                alert(data?.message)
            }
            else{
                alert('Product created successfully')
                navigate('/dashboard/admin/products')
            }
        }
        catch(error){
            console.log(error)
            alert('Something went wrong')
        }
    }

    return(
        <Layout>
            <Grid container style={{marginTop:'15vh'}}>
                <Grid item lg={2} sm={2} xs={12}>
                   <AdminMenu/>
                </Grid>
                <Grid container item xs={12} sm={9} lg={9} style={{marginLeft:10}}>
                    <Box>
                        <Typography style={{textAlign:'center'}}>Create Product</Typography>
                        <StyledBox>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={categories.map((c)=>c.name)}
                                // value={category._id}
                                onChange={(event,newValue)=>{
                                    if (newValue) {
                                        const selectedCategory = categories.find((c) => c.name === newValue);
                                        const selectedCategoryId = selectedCategory._id;
                                        setCategory(selectedCategoryId)
                                      }
                                }}
                                sx={{ width: 800 }}
                                renderInput={(params) => <TextField {...params} label="Select a category" />}
                            />
                        </StyledBox>
                        <StyledBox>
                            <label htmlFor='upload images' style={{border:'1px solid black',padding:10}}>
                                {photo ? photo.name : "Upload photo"}
                                <input type='file' name='photo' id='upload images' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                            </label>
                        </StyledBox>
                        <StyledBox>
                            {photo && (
                                <Box>
                                    <img src={URL.createObjectURL(photo)} alt='product_photo' height={200} width={300} />
                                </Box>
                            )}
                        </StyledBox>
                        <StyledBox>
                            <TextField label='Write a name' onChange={(e)=>setName(e.target.value)}></TextField>
                            <TextareaAutosize
                                minRows={5}
                                placeholder="Write something!!!"
                                onChange={(e)=>setDescription(e.target.value)}
                                name="description"
                                style={{marginTop:20,fontSize:16,padding:10}}
                            />
                            <TextField label='Write a price' onChange={(e)=>setPrice(e.target.value)}></TextField>
                            <TextField label='Write a quantity' onChange={(e)=>setQuantity(e.target.value)}></TextField>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Shipping</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Shipping"
                                    onChange={(e)=>setShipping(e.target.value)}
                                >
                                    <MenuItem value={"1"}>YES</MenuItem>
                                    <MenuItem value={"0"}>NO</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant='contained' onClick={handleCreate} style={{marginTop:20}}>CREATE PRODUCT</Button>
                        </StyledBox>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Create_Product