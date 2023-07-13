import { Box, Grid, Typography } from '@mui/material';
import Layout from './../../components/Layout/Layout';
import AdminMenu from './AdminMenu';
import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';


const AdminDashboard=()=>{
    const {auth}=useContext(DataContext)
    return(
        <Layout>
            <Grid container style={{marginTop:'15vh'}}>
                <Grid item lg={2} sm={2} xs={12}>
                   <AdminMenu/>
                </Grid>
                <Grid container item xs={12} sm={9} lg={9} style={{marginLeft:10}}>
                    <Box>
                        <Typography>Admin Name: {auth?.user?.name}</Typography>
                        <Typography>Admin Email: {auth?.user?.email}</Typography>
                        <Typography>Admin Phone: {auth?.user?.phone}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default AdminDashboard