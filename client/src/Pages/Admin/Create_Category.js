import {Grid, Box, Typography, Table,TableHead,TableBody,TableRow,TableCell, Button, Modal} from '@mui/material'
import Layout from "../../components/Layout/Layout"
import AdminMenu from './AdminMenu'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Create_Category=()=>{
    const [categories,setCategories]=useState([])
    const [name,setName]=useState('')

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const[selected,setSelected]=useState(null)
    const[updateName,setUpdatedName]=useState('')


    const handleSubmit=async(e)=>{
        try{
            const {data}=await axios.post(`${process.env.REACT_APP_BASE_URL}/create-category`,{name})
            if(data?.success){
                alert(`${name} is created`)
                getAllCategory()
            }
            else{
                alert(`${data.message}`)
            }
        }
        catch(error){
            console.log(error)
            alert('Something went wrong in input form')
        }
    }

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

    const handleUpdate=async(e)=>{
        try{
            const {data}=await axios.put(`${process.env.REACT_APP_BASE_URL}/update-category/${selected._id}`,{name:updateName})
            if(data.success){
                alert(`${updateName} is updated`)
                setSelected(null)
                setUpdatedName('')
                handleClose()
                getAllCategory()
            }
            else{
                alert(data.message)
            }
        }
        catch(error){
            alert('Something went wrong')
        }
    }

    const handleDelete=async(pid)=>{
        try{
            const {data}=await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-category/${pid}`)
            if(data.success){
                alert(`Category is deleted`)
                getAllCategory()
            }
            else{
                alert(data.message)
            }
        }
        catch(error){
            alert('Something went wrong')
        }
    }

    return(
        <Layout>
            <Grid container style={{marginTop:'15vh'}}>
                <Grid item lg={2} sm={2} xs={12}>
                    <AdminMenu/>
                </Grid>
                <Grid container item xs={12} sm={9} lg={9} style={{marginLeft:'auto'}}>
                    <Box>
                        <Typography style={{textAlign:'center',fontWeight:700,color:'blue'}}>Manage Category</Typography>
                        <Box>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                        </Box>
                        <Box>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{fontSize:16,fontWeight:600}}>Name</TableCell>
                                        <TableCell style={{fontSize:16,fontWeight:600}}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        categories.map(cat=>{
                                            return(
                                                <>
                                                    <TableRow>
                                                        <TableCell key={cat._id} style={{fontSize:18}}>{cat.name}</TableCell>
                                                        <TableCell>
                                                            <Button variant='contained' onClick={()=>{handleOpen();setUpdatedName(cat.name);setSelected(cat)}}>Edit</Button>
                                                            <Button variant='contained' style={{marginLeft:'2px',backgroundColor:'red'}} onClick={()=>{handleDelete(cat._id)}}>Delete</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Box>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <CategoryForm value={updateName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                            </Box>
                        </Modal>

                    </Box>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Create_Category