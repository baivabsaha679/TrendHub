import { Box, Typography, Grid, Button,styled } from "@mui/material"
import Layout from "../components/Layout/Layout"
import { useState,useEffect } from "react"
import useCategory from "../hooks/useCategory"
import { Link } from "react-router-dom"

const StyledBox=styled(Box)`
    
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    & > button{
        margin:10px 0px;
        width:30%;
    }
`

const Categories=()=>{
    const categories=useCategory()
    return(
        <Layout>
            <Grid container style={{marginTop:'15vh'}}>
                <Grid container item lg={12} sm={12} xs={12}>
                    <StyledBox>
                        {
                            categories?.map(c=>{
                                return(
                                        <Button variant="contained" key={c._id}><Link to={`/category/${c.slug}`} style={{color:'#fff',textDecoration:'none'}}>{c.name}</Link></Button>
                                        )
                                })
                        }
                    </StyledBox>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default Categories