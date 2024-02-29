import React from 'react'
import TopNav from '../../Components/TopNav'
import Banner from '../../Components/Banner'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import FAQ from '../../Components/FAQ'
import Footer from '../../Components/Footer'
import { FormDialog } from '../../Components/form-dialog'
import { CREATE } from '../../Utils/constant'
import { donateFormFields, paymentFormFields } from '../../seed/form-fields'
import { makePaymentUrl, requestOTPUrl, verifyOTPUrl } from '../../seed/url'
import ViewTicket from '../../Components/ViewTicket'

function HomePage() {
    const [openBuyTicketDialog, setOpenBuyTicketDialog] = React.useState(false);
    const [openDonateDialog, setOpenDonateDialog] = React.useState(false);
    const [openViewTicketDialog, setOpenViewTicketDialog] = React.useState(false);
    const [paymentFields, setPaymentFields] = React.useState(paymentFormFields);
    const [donateFields, setDonateFields] = React.useState(donateFormFields);
    const payTicketValues = [
        {
            ticket_owner: "",
            t_shirt_size: "",
            amount: 30000,
            phone_number: "",
            location: "",
            otp: "",
            event_id: 1,
            event_package_id: 1,
        },
    ];
    const donateValues = [
        {
            ticket_owner: "",
            amount: 1000,
            phone_number: "",
            location: "",
            otp: "",
            event_id: 1,
            event_package_id: 1,
        },
    ];

    const handleClickOpenBuyTicketDialog = () => {
        setOpenBuyTicketDialog(true);
    };

    const handleCloseBuyTicketDialog = () => {
        setPaymentFields(paymentFormFields);
        setDonateFields(donateFormFields);
        setOpenBuyTicketDialog(false);
    };

    const handleClickDonateDialog = () => {
        setOpenDonateDialog(true);
    };

    const handleCloseDonateDialog = () => {
        setPaymentFields(paymentFormFields);
        setDonateFields(donateFormFields);
        setOpenDonateDialog(false);
    };

    const handleClickViewTicketDialog = () => {
        setOpenViewTicketDialog(true);
    };

    const handleCloseViewTicketDialog = () => {
        setOpenViewTicketDialog(false);
    };

    const firstSectionItems = [
        {
            title: "KUHUSU PUGU MARATHON",
            body: "Mashindano ya Kukimbia kwa Wadau wote, Njoo ukimbie kwa afya yako."
        },
        {
            title: "USAJILI",
            body: "Ni rahisi kupata tiketi yako kwa njia ya online."
        },
        {
            title: "UNGANA NA SISI",
            body: "Mazoezi kwa afya Bora. Karibu sana PUGU Marathon."
        }
    ]

    const secondSectionItems = [
        {
            title: "NAMNA YA KUPATA TIKETI YAKO",
            body: "Ni rahisi kupata tiketi yako kwa njia ya online",
            imageSrc: "/assets/images/marathon1.webp",
            button1: {
                text: "Nunua Tiketi",
                variant: "contained",
                sx: {
                    my: 1,
                    mr: 2,
                }
            },
            button2: {
                text: "Changia",
                variant: "contained",
                color: "success",
                sx: {
                    my: 1,
                    mr: 2
                }
            },
            button3: {
                text: "Pakua Tiketi",
                variant: "contained",
            }
        },
        {
            title: "JIUNGE NA SISI KAMA MFADHILI!",
            body: "Unaweza ukalipia ili kufadhili mbio hizi pasipo na wewe kukimbia na washiriki wengine kwa kubonyeza kitufe kilichoandikwa CHANGIA.",
            imageSrc: "/assets/images/marathon2.webp",
            bgColor: "#1c4571",
            button1: {
                text: "Nunua Tiketi",
                variant: "outlined",
                sx: {
                    my: 1,
                    mr: 2,
                    color: "white",
                    border: "1px solid white",
                    borderRadius: 16,
                }
            },
            button2: {
                text: "Changia",
                variant: "outlined",
                color: "success",
                sx: {
                    my: 1,
                    mr: 2,
                    color: "white",
                    border: "1px solid white",
                    borderRadius: 16,
                }
            },
            button3: {
                text: "Pakua Tiketi",
                variant: "outlined",
                color: "success",
                sx: {
                    my: 1,
                    color: "white",
                    border: "1px solid white",
                    borderRadius: 16,
                }
            }
        },
        {
            title: "NUNUA TIKETI",
            body: "Ni rahisi zaidi kununua tiketi kwa kubonyeza kitufe kilichoandikwa NUNUA TIKETI halafu utajaza taarifa husika za mshiriki anaetaka kununuliwa tiketi.",
            imageSrc: "/assets/images/marathon3.webp",
            button1: {
                text: "Nunua Tiketi",
                variant: "contained",
                sx: {
                    my: 1,
                    mr: 2
                }
            },
            button2: {
                text: "Changia",
                variant: "contained",
                color: "success",
                sx: {
                    my: 1,
                    mr: 2
                }
            },
            button3: {
                text: "Pakua Tiketi",
                variant: "contained",
            }
        },
        {
            title: "UHAMASISHAJI WA JAMII",
            body: "Mbio hizi za Pugu Marathon zinahamasisha jamii kufanya mazoezi ili kuwa na afya bora ili kuepuka na magonjwa ambayo yanaweza zuilika kwa kutokufanya mazoezi.",
            imageSrc: "/assets/images/marathon1.webp",
            bgColor: "#1c4571",
            button1: {
                text: "Nunua Tiketi",
                variant: "outlined",
                sx: {
                    my: 1,
                    mr: 2,
                    color: "white",
                    border: "1px solid white",
                    borderRadius: 16,
                }
            },
            button2: {
                text: "Changia",
                variant: "outlined",
                color: "success",
                sx: {
                    my: 1,
                    mr: 2,
                    color: "white",
                    border: "1px solid white",
                    borderRadius: 16,
                }
            },
            button3: {
                text: "Pakua Tiketi",
                variant: "outlined",
                sx: {
                    my: 1,
                    color: "white",
                    border: "1px solid white",
                    borderRadius: 16,
                }
            }
        }
    ]

    return (
        <>
            {openBuyTicketDialog && (
                <FormDialog
                    open={openBuyTicketDialog}
                    handleClose={handleCloseBuyTicketDialog}
                    dialogTitle={"Nunua Tiketi"}
                    action={CREATE}
                    fields={paymentFields}
                    setFields={setPaymentFields}
                    values={payTicketValues}
                    firstCallbackUrl={requestOTPUrl}
                    secondCallbackUrl={verifyOTPUrl}
                    thirdCallbackUrl={makePaymentUrl}
                />
            )}
            {openDonateDialog && (
                <FormDialog
                    open={openDonateDialog}
                    handleClose={handleCloseDonateDialog}
                    dialogTitle={"Changia"}
                    action={CREATE}
                    fields={donateFields}
                    setFields={setDonateFields}
                    values={donateValues}
                    firstCallbackUrl={requestOTPUrl}
                    secondCallbackUrl={verifyOTPUrl}
                    thirdCallbackUrl={makePaymentUrl}
                />
            )}
            {openViewTicketDialog && (
                <ViewTicket
                    open={openViewTicketDialog}
                    handleClose={handleCloseViewTicketDialog}
                />
            )}
            <TopNav />
            <Banner />
            <Container
                maxWidth={"lg"}
            >
                <Grid
                    container
                    sx={{
                        backgroundColor: "#1c4571",
                        my: 1,
                        p: 3
                    }}
                >
                    {firstSectionItems.map((item, index) => {
                        return (
                            <Grid
                                item
                                key={index}
                                xs={12}
                                sm={12}
                                md={4}
                                lg={4}
                                xl={4}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        border: "1px solid white",
                                        p: 3,
                                        height: "100%"
                                    }}
                                >
                                    <Typography variant='h5' sx={{ py: 2, fontWeight: 700 }} color='white' align='center'>
                                        {item.title}
                                    </Typography>
                                    <Typography variant='body1' color='white' align='center'>
                                        {item.body}
                                    </Typography>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
            {secondSectionItems.map((item, index) => {
                return (
                    <Box
                        key={index}
                        sx={{
                            ...(item.bgColor && {
                                backgroundColor: "#1c4571"
                            })
                        }}
                    >
                        <Container
                            maxWidth={"lg"}
                        >
                            <Grid
                                container
                                sx={{
                                    my: 1,
                                    p: 3
                                }}
                            >
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
                                    <Typography
                                        variant='h5'
                                        color={item.bgColor && 'white'}
                                        sx={{
                                            fontWeight: 700,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography variant='body1' sx={{ py: 3 }} color={item.bgColor && 'white'}>
                                        {item.body}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap"
                                        }}
                                    >
                                        <Button
                                            color={item.button1.color && item.button1.color}
                                            size='large'
                                            variant={item.button1.variant && item.button1.variant}
                                            sx={item.button1.sx && item.button1.sx}
                                            onClick={handleClickOpenBuyTicketDialog}
                                        >
                                            {item.button1.text}
                                        </Button>
                                        <Button
                                            color={item.button2.color && item.button2.color}
                                            size='large'
                                            variant={item.button2.variant && item.button2.variant}
                                            sx={item.button1.sx && item.button1.sx}
                                            onClick={handleClickDonateDialog}
                                        >
                                            {item.button2.text}
                                        </Button>
                                        <Button
                                            color={item.button3.color && item.button3.color}
                                            size='large'
                                            variant={item.button3.variant && item.button3.variant}
                                            sx={item.button1.sx && item.button1.sx}
                                            onClick={handleClickViewTicketDialog}
                                        >
                                            {item.button3.text}
                                        </Button>
                                    </Box>
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
                                        ...(item.bgColor && {
                                            order: -1
                                        })
                                    }}
                                >
                                    <Box
                                        component='img'
                                        sx={{
                                            width: "100%"
                                        }}
                                        alt="Logo"
                                        src={item.imageSrc}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                )
            })}
            <FAQ />
            <Footer />
        </>
    )
}

export default HomePage