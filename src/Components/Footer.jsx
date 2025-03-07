import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

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
                backgroundColor: "black",
                mt: 5,
                p: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 2
                    }}
                >
                    {footerItems.map((item, index) => (
                        <Box key={index} sx={{ display: "flex" }}>
                            {item.icon}
                            <Typography color='white'>
                                {item.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Typography textAlign="center" color="white" sx={{ mt: 2 }}>
                    © {new Date().getFullYear()} Pugu Marathon.{" "}
                    All Rights Reserved.
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer