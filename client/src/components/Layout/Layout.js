import Footer from "./Footer"
import Header from "./Header"
import { Box } from "@mui/material"


const Layout=({children})=>{
    return(
        <>
            <Header/>
            <Box style={{minHeight:'80vh',marginTop:65}}>{children}</Box>
            <Footer/>
        </>
    )
}
export default Layout