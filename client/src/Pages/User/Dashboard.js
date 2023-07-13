import { Typography, Grid, Box } from "@mui/material"

import Layout from "../../components/Layout/Layout"
import UserMenu from "./UserMenu"
import { useContext } from "react"
import { DataContext } from "../../context/DataProvider"


const Dashboard=()=>{
    const{auth}=useContext(DataContext)
    return(
        <Layout>
            <Grid container style={{marginTop:'10vh'}}>
                <Grid item lg={2} sm={2} xs={12}>
                   <UserMenu/>
                </Grid>
                <Grid container item xs={12} sm={9} lg={9} style={{marginLeft:10}}>
                    <Box>
                        <Typography>User Name: {auth?.user?.name}</Typography>
                        <Typography>User Email: {auth?.user?.email}</Typography>
                        <Typography>User Phone: {auth?.user?.phone}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Dashboard