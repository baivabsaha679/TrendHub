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

const Policy = () => {

    return (
        <Layout>
            <Box>
                <Banner/>
                <Wrapper>
                    <Typography variant="h3">TrendHub</Typography>
                    <Text variant="h5">         
                    Welcome to the privacy policy page of our ecommerce website. We understand the importance of privacy and are committed to protecting the personal information of our users. This page aims to provide you with clear and transparent information on how we collect, use, and safeguard your data.
                    </Text>
                    <Text variant="h5">
                        Reach out to me on
                        <Box component="span" style={{ marginLeft: 5 }}>
                            <Link href="https://www.instagram.com/baivabsaha679/" color="inherit" target="_blank">
                                <Instagram />
                            </Link>
                        </Box>  
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

export default Policy;