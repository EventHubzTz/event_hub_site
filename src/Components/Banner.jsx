import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box, Container, Typography } from '@mui/material'

function Banner() {
    const items = [
        {
            src: "https://www.service.eventhubtz.com/products/images/hlkcd8xfezhzba2g1jsi3d52191a-7f96-4118-abe5-7c532cfed2ba.jpg"
        }
    ]

    return (
        <Carousel
            indicators={false}
            stopAutoPlayOnHover={false}
            sx={{
                height: { xs: "150px", sm: "280px", md: "410px", lg: "500px", xl: "600px" }
            }}
        >
            {items.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <Item item={item} index={index} />
                    </React.Fragment>
                )
            })}
        </Carousel>
    )
}

export default Banner;

function Item({ item, index }) {
    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            <Box
                key={index}
                component='img'
                sx={{
                    width: "100vw",
                }}
                alt="Logo"
                src={item.src}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.6)',
                }}
            >
                <Container>
                    <Typography
                        variant='h5'
                        sx={{
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        {/* Title */}
                    </Typography>
                    <br />
                    <Typography
                        variant='body1'
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        {/* Description */}
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}