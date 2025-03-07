import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box, Button, } from '@mui/material'

function Banner({
    handleClickOpenBuyTicketDialog,
    handleClickDonateDialog,
    handleClickViewTicketDialog,
}) {
    const items = [
        {
            src: "/assets/images/banner.jpeg"
        }
    ]

    return (
        <Carousel
            indicators={false}
            stopAutoPlayOnHover={false}
            sx={{
                height: '80vh',
            }}
        >
            {items.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <Item
                            index={index}
                            item={item}
                            handleClickOpenBuyTicketDialog={handleClickOpenBuyTicketDialog}
                            handleClickDonateDialog={handleClickDonateDialog}
                            handleClickViewTicketDialog={handleClickViewTicketDialog}
                        />
                    </React.Fragment>
                )
            })}
        </Carousel>
    )
}

export default Banner;

function Item({
    index,
    item,
    handleClickOpenBuyTicketDialog,
    handleClickDonateDialog,
    handleClickViewTicketDialog,
}) {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '80vh',
            }}
        >
            <Box
                key={index}
                sx={{
                    width: "100vw",
                    height: '100%',
                    backgroundImage: `url(${item.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        background: 'rgba(0, 0, 0, 0.6)',
                    }}
                >
                    <Button
                        size='large'
                        variant='contained'
                        sx={{ width: 200, height: 60, fontSize: 20, borderRadius: 4 }}
                        onClick={() => {
                            handleClickOpenBuyTicketDialog()
                        }}
                    >
                        <b>Nunua Tiketi</b>
                    </Button>
                    <Button
                        size='large'
                        variant='contained'
                        color='success'
                        sx={{ width: 200, height: 60, fontSize: 20, borderRadius: 4 }}
                        onClick={() => {
                            handleClickDonateDialog()
                        }}
                    >
                        <b>Changia</b>
                    </Button>
                    <Button
                        size='large'
                        variant='contained'
                        sx={{ width: 200, height: 60, fontSize: 20, borderRadius: 4 }}
                        onClick={() => {
                            handleClickViewTicketDialog()
                        }}
                    >
                        <b>Pakua tiketi</b>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}