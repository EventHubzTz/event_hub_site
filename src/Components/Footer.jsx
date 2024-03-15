import React from 'react'
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom'
import { pages } from './TopNav'

const footerItems = [
    {
        title: "Dar es salaam, Tanzania.",
        icon: <AddLocationIcon sx={{ color: "white", mr: 1 }} />
    },
    {
        title: "+255 784 757 471",
        icon: <PhoneIcon sx={{ color: "white", mr: 1 }} />
    },
    {
        title: "info@pugumarathon.co.tz",
        icon: <EmailIcon sx={{ color: "white", mr: 1 }} />
    }
]

function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: "#1c4571",
                mt: 5
            }}
        >
            <Container>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        sx={{
                            p: 2
                        }}
                    >
                        <Typography variant='h5' sx={{ fontWeight: 700, py: 3 }} color='white'>
                            QUICK LINK
                        </Typography>
                        {pages.map((page) => (
                            <Link key={page.title} to={page.link}>
                                <Typography variant='body1' color='white' sx={{ mb: 1 }}>
                                    {page.title}
                                </Typography>
                            </Link>
                        ))}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        sx={{
                            p: 2
                        }}
                    >
                        <Typography variant='h5' sx={{ fontWeight: 700, py: 3 }} color='white'>
                            GET IN TOUCH
                        </Typography>
                        {footerItems.map((item, index) => (
                            <Box key={index} sx={{ display: "flex", mb: 3 }}>
                                {item.icon}
                                <Typography color='white'>
                                    {item.title}
                                </Typography>
                            </Box>
                        ))}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        sx={{
                            p: 2,
                        }}
                    >
                        <Stack direction="row" spacing={1}>
                            <IconButton aria-label="facebook">
                                <FacebookIcon sx={{ color: "white" }} />
                            </IconButton>
                            <IconButton aria-label="twitter">
                                <TwitterIcon sx={{ color: "white" }} />
                            </IconButton>
                            <IconButton aria-label="instagram">
                                <InstagramIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer