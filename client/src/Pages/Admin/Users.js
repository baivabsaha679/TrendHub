import {Grid, Box, Typography} from '@mui/material'
import Layout from "../../components/Layout/Layout"
import AdminMenu from './AdminMenu'



const Users=()=>{
    return(
        <Layout>
            <Grid container style={{marginTop:'15vh'}}>
                <Grid item lg={2} sm={2} xs={12}>
                   <AdminMenu/>
                </Grid>
                <Grid container item xs={12} sm={9} lg={9} style={{marginLeft:10}}>
                    <Box>
                        <Typography>Users</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Users