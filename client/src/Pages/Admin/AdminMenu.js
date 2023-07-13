import { Button, Table, TableHead, TableBody, TableRow, TableCell,styled} from "@mui/material";
import {Link, useSearchParams} from 'react-router-dom'

const StyledTable=styled(Table)`
    border:1px solid rgba(224,224,224,1);
`
const StyledLink=styled(Link)`
    text-decoration:none;
    color:inherit;
`

const AdminMenu=()=>{

    return(
        <>
          <StyledTable>
             <TableHead>
                <TableRow>
                    <TableCell style={{fontSize:18,fontWeight:600,color:'blue'}}>Admin Panel</TableCell>
                </TableRow>
             </TableHead>
             <TableBody>
               <TableRow>
                 <TableCell><StyledLink to={'/dashboard/admin/create-category'}>Create Category</StyledLink></TableCell>
               </TableRow>
               <TableRow>
                 <TableCell><StyledLink to={'/dashboard/admin/create-product'}>Create Product</StyledLink></TableCell>
               </TableRow>
               <TableRow>
                 <TableCell><StyledLink to={'/dashboard/admin/products'}>Products</StyledLink></TableCell>
               </TableRow>
               <TableRow>
                 <TableCell><StyledLink to={'/dashboard/admin/orders'}>Orders</StyledLink></TableCell>
               </TableRow>
             </TableBody>
          </StyledTable>
        </>
    )
}
export default AdminMenu