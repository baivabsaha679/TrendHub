import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

import Layout from "../components/Layout/Layout"

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Layout>
            <Box>
                <Banner />
                <Wrapper>
                    <Typography variant="h3">Getting in touch is easy!</Typography>    
                    <Text variant="h5">
                        Reach out to me on
                        <Link href="https://www.instagram.com/baivabsaha679/" color="inherit" target="_blank">
                            <Instagram/>
                        </Link>
                        or send me an Email 
                        <Link href="mailto:baivabsaha100@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                    </Text>
                </Wrapper>
            </Box>
        </Layout>
    )
}

export default Contact;