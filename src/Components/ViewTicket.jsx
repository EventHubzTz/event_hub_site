import React from 'react'
import { AppBar, Avatar, Box, Button, CircularProgress, Container, Dialog, DialogContent, Divider, IconButton, TablePagination, Toolbar, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { CustomSearch } from "./custom-search";
import { authPostRequest } from '../services/api-service';
import { getAllPaymentTransactionsUrl } from '../seed/url';
import { formatMoney } from '../Utils/constant';
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
        pdf.save(`${selectedData?.full_name} Ticket`);
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
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Avatar
                                            alt='logo'
                                            src='/assets/images/logo.jpeg'
                                            sx={{
                                                width: 40,
                                                height: 40
                                            }}
                                        />
                                    </Box>
                                    <Divider sx={{ my: 0.5 }} />
                                    <Typography variant='body2' sx={{ mt: 1 }}>
                                        Mkoa
                                    </Typography>
                                    <Typography variant='body2' fontWeight={600}>
                                        {selectedData?.region ? `${selectedData?.region}, ` : ""}
                                        {selectedData?.location}
                                    </Typography>
                                    <Typography variant='body2' sx={{ mt: 1 }}>
                                        Jina
                                    </Typography>
                                    <Typography variant='body2' fontWeight={600}>
                                        {selectedData?.full_name}
                                    </Typography>
                                    <Typography variant='body2' sx={{ mt: 1 }}>
                                        T Shirt
                                    </Typography>
                                    <Typography variant='body2' fontWeight={600}>
                                        {selectedData?.t_shirt_size}
                                    </Typography>
                                    <Typography variant='body2' sx={{ mt: 1 }}>
                                        Umbali
                                    </Typography>
                                    <Typography variant='body2' fontWeight={600}>
                                        {selectedData?.distance}
                                    </Typography>
                                    <Typography variant='body2' sx={{ mt: 1 }}>
                                        Simu
                                    </Typography>
                                    <Typography variant='body2' fontWeight={600}>
                                        {selectedData?.phone_number}
                                    </Typography>
                                    <Typography variant='body2' sx={{ mt: 1 }}>
                                        Tarehe
                                    </Typography>
                                    <Typography variant='body2' fontWeight={600}>
                                        {selectedData?.created_at}
                                    </Typography>
                                    <Typography variant='body2' sx={{ mt: 1 }}>
                                        Kiasi
                                    </Typography>
                                    <Typography variant='body2' fontWeight={600}>
                                        {formatMoney(selectedData?.amount)}
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        my: 2,
                                    }}>
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://management.pugumarathon.co.tz/ticket/${selectedData?.transaction_id}`} alt="QR Code" width="100" height="100" />
                                    </Box>
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
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "14%" } }}>
                                                            {item.full_name}
                                                        </Typography>
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "14%" } }}>
                                                            {item.t_shirt_size}
                                                        </Typography>
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "14%" } }}>
                                                            {item.distance}
                                                        </Typography>
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "14%" } }}>
                                                            {item.location}
                                                        </Typography>
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "14%" } }}>
                                                            {formatMoney(item.amount)}
                                                        </Typography>
                                                        <Typography variant='body1' sx={{ width: { xs: "100%", sm: "100%", md: "14%" } }}>
                                                            {item.created_at}
                                                        </Typography>
                                                        <Button
                                                            variant='contained'
                                                            sx={{ my: 1, width: { xs: "100%", sm: "100%", md: "14%" } }}
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