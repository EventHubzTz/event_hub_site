import React from 'react'
import { AppBar, Avatar, Box, Button, CircularProgress, Container, Dialog, DialogContent, Divider, Grid, IconButton, TablePagination, Toolbar, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { CustomSearch } from "./custom-search";
import { authPostRequest } from '../services/api-service';
import { getAllPaymentTransactionsUrl } from '../seed/url';
import { formatDate, formatMoney } from '../Utils/constant';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Watermark } from '@hirohe/react-watermark';

function ViewTicket({ open, handleClose }) {
    const [viewTicket, setViewTicket] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState({});
    const [searchTerm, setSearchTerm] = React.useState("0");
    const [tickets, setTickets] = React.useState({
        page: 1,
        total_results: 0,
        total_pages: 0,
        results: [],
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const printRef = React.useRef();

    async function printInvoice() {
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${selectedData?.ticket_owner} Ticket`);
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetcher = React.useCallback(
        (page) => {
            if (searchTerm.length === 10) {
                setIsLoading(true);
                authPostRequest(
                    getAllPaymentTransactionsUrl,
                    {
                        phone_number: searchTerm,
                        sort: "id desc",
                        limit: rowsPerPage,
                        page: page,
                    },
                    (data) => {
                        setTickets(data);
                        setIsLoading(false);
                    },
                    (error) => {
                        setTickets({
                            page: 1,
                            total_results: 0,
                            total_pages: 0,
                            results: [],
                        });
                        setIsLoading(false);
                    }
                );
            }
        },
        [rowsPerPage, searchTerm]
    );

    const handlePageChange = React.useCallback(
        (event, value) => {
            fetcher(value + 1);
        },
        [fetcher]
    );

    const handleRowsPerPageChange = React.useCallback((event) => {
        setRowsPerPage(event.target.value);
    }, []);

    React.useEffect(() => {
        fetcher(1);
    }, [fetcher, searchTerm]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            PaperProps={{
                style: {
                    boxShadow: "none"
                },
            }}
        >
            <DialogContent>
                <AppBar
                    id='appbar'
                    sx={{
                        position: 'relative',
                    }}
                    color='transparent'
                    elevation={0}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                handleClose()
                            }}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        pt: 2,
                        pb: 8,
                    }}
                >
                    <Container maxWidth={false}>
                        {viewTicket &&
                            <Box>
                                <Box>
                                    <Button
                                        variant='contained'
                                        sx={{
                                            mr: 2,
                                            my: 2
                                        }}
                                        onClick={() => printInvoice()}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        variant='contained'
                                        sx={{
                                            my: 2
                                        }}
                                        color='error'
                                        onClick={() => setViewTicket(false)}
                                    >
                                        Ghairi
                                    </Button>
                                </Box>
                                <Box
                                    ref={printRef}
                                    sx={{ p: { xs: 2, sm: 2, md: 2 }, maxWidth: "300px" }}
                                    border={1}
                                    borderColor="lightgray"
                                >
                                    {/* <Watermark text="Pugu Marathon"> */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            alignContent: "end",
                                        }}
                                    >
                                        <Avatar
                                            alt='logo'
                                            src='/assets/images/logo.jpeg'
                                            sx={{
                                                width: 80,
                                                height: 80
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontStyle: "italic",
                                                letterSpacing: 3,
                                                fontWeight: 900
                                            }}
                                        >
                                            MARATHON
                                        </Typography>
                                    </Box>
                                    <Typography textAlign="center" variant='body1'>
                                        <b>Taarifa Za Risiti</b>
                                    </Typography>
                                    <Divider sx={{ my: 0.5 }} />
                                    <Typography textAlign="center" variant='body1' sx={{ mt: 0.5 }}>
                                        <b>Taarifa Za Akaunti</b>
                                    </Typography>
                                    <Divider sx={{ my: 0.5 }} />
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                Mahali:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                {selectedData?.location}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                Jina:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                {selectedData?.ticket_owner}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                T Shirt:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                {selectedData?.t_shirt_size}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                Simu:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                {selectedData?.phone_number}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 0.5 }} />
                                    <Typography textAlign="center" variant='body1' sx={{ mt: 0.5 }}>
                                        <b>Taarifa Za Muamala</b>
                                    </Typography>
                                    <Divider sx={{ my: 0.5 }} />
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                Muamala:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1' noWrap>
                                                {selectedData?.transaction_id}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                Tarehe:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                {formatDate(selectedData?.created_at)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                Kiasi:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body1'>
                                                {formatMoney(selectedData?.amount)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    {/* </Watermark> */}
                                </Box>
                            </Box>
                        }
                        {!viewTicket &&
                            <>
                                <CustomSearch handleSearch={handleSearch} />
                                {tickets.results.length === 0 && isLoading &&
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <CircularProgress
                                            sx={{
                                                mx: 'auto',
                                                my: 3,
                                            }}
                                        />
                                    </Box>
                                }
                                {tickets.results.length === 0 && !isLoading &&
                                    <Typography
                                        sx={{ my: 5, }}
                                        align='center'
                                        color="inherit"
                                        variant="h5"
                                        component="div"
                                    >
                                        Hakuna Tiketi
                                    </Typography>
                                }
                                {tickets.results.length > 0 && !isLoading &&
                                    <Box>
                                        {tickets.results.map((item, index) => {
                                            return (
                                                <Watermark text="Pugu Marathon">
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            my: 4,
                                                            p: 1
                                                        }}
                                                        border={1}
                                                        borderColor="lightgray"
                                                    >
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "16%" } }}>
                                                            {item.ticket_owner}
                                                        </Typography>
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "16%" } }}>
                                                            {item.t_shirt_size}
                                                        </Typography>
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "16%" } }}>
                                                            {item.location}
                                                        </Typography>
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "16%" } }}>
                                                            {formatMoney(item.amount)}
                                                        </Typography>
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "16%" } }}>
                                                            {formatDate(item.created_at)}
                                                        </Typography>
                                                        <Button
                                                            variant='contained'
                                                            sx={{ my: 1, width: { xs: "100%", sm: "100%", md: "16%" } }}
                                                            onClick={() => {
                                                                setSelectedData(item);
                                                                setViewTicket(true);
                                                            }}
                                                        >
                                                            Ona Tiketi
                                                        </Button>
                                                    </Box>
                                                </Watermark>
                                            );
                                        })}
                                    </Box>
                                }
                                {tickets.results.length > 0 && !isLoading &&
                                    <TablePagination
                                        component="div"
                                        count={tickets.total_results}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                        page={
                                            tickets.page >= 1
                                                ? tickets.page - 1
                                                : tickets.page
                                        }
                                        rowsPerPage={rowsPerPage}
                                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                    />
                                }
                            </>
                        }
                    </Container>
                </Box>
            </DialogContent >
        </Dialog >
    )
}

export default ViewTicket