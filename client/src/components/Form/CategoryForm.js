import {Box,TextField, Button, styled, Typography} from '@mui/material'

const Component=styled(Box)`
    width: 400px;
    margin: 10px auto;
    box-shadow: 2px 2px 2px 2px rgb(0 0 0/ 0.6);
`

const Wrapper=styled(Box)`
    padding: 15px 25px;
    display: flex;
    flex-direction: column; 
    flex: 1;
    & > div,& > button{
        margin-top:10px;
    }
`

const SignUpButton=styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874f0;
    height:40px;
    border-radius:2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`

const CategoryForm=({handleSubmit,value,setValue})=>{
    return(
        <>

                <Component>
                        <Wrapper>
                            <TextField variant='outlined' label='Enter New Category' value={value} onChange={(e)=>setValue(e.target.value)}/>
                            <SignUpButton onClick={()=>handleSubmit()}>Submit</SignUpButton>
                        </Wrapper>

                </Component>

        </>
    )
}
export default CategoryForm