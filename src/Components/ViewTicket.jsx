import React from 'react';
import {
  AppBar, Avatar, Box, Button, CircularProgress, Container,
  Dialog, DialogContent, Divider, IconButton, TablePagination,
  Toolbar, Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { CustomSearch } from "./custom-search";
import { authPostRequest } from '../services/api-service';
import { getAllPaymentTransactionsUrl } from '../seed/url';
import { formatMoney } from '../Utils/constant';
import jsPDF from "jspdf";
import { Watermark } from '@hirohe/react-watermark';
import html2canvas from 'html2canvas';

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
          
              const printInvoice = async () => {
                const element = printRef.current;
              
                // Capture image
                const canvas = await html2canvas(element, {
                  scale: 2,
                  useCORS: true,
                });
              
                const imgData = canvas.toDataURL("image/png");
              
                // Create a custom size PDF (same as ticket container)
                const pdfWidth = 300; // pixels
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
              
                const pdf = new jsPDF({
                  orientation: "portrait",
                  unit: "px",
                  format: [pdfWidth, pdfHeight],
                });
              
                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${selectedData?.full_name}_Ticket.pdf`);
              };
              
          
              const handleSearch = (event) => setSearchTerm(event.target.value);
          
              const fetcher = React.useCallback((page) => {
                if (searchTerm.length === 10) {
                  setIsLoading(true);
                  authPostRequest(
                    getAllPaymentTransactionsUrl,
                    {
                      phone_number: searchTerm,
                      sort: "id desc",
                      limit: rowsPerPage,
                      page,
                    },
                    (data) => {
                      setTickets(data);
                      setIsLoading(false);
                    },
                    () => {
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
              }, [rowsPerPage, searchTerm]);
          
              const handlePageChange = React.useCallback((event, value) => {
                fetcher(value + 1);
              }, [fetcher]);
          
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
                  PaperProps={{ style: { boxShadow: "none" } }}
                >
                  <DialogContent>
                    <AppBar position="relative" color="transparent" elevation={0}>
                      <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                          <Close />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
            
                    <Box component="main" sx={{ flexGrow: 1, pt: 2, pb: 8 }}>
                      <Container maxWidth={false}>
                        {viewTicket ? (
                          <Box>
                            <Box>
                              <Button
                                variant="contained"
                                sx={{ mr: 2, my: 2 }}
                                onClick={printInvoice}
                              >
                                Download
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                sx={{ my: 2 }}
                                onClick={() => setViewTicket(false)}
                              >
                                Ghairi
                              </Button>
                            </Box>
                        
                            <Box
              ref={printRef}
              sx={{
                width: '290px',
                height: 'auto', // Fit inside 500px height with some margin
                padding: '10px',
                backgroundColor: '#fff',
                fontFamily: 'Arial, sans-serif',
                fontSize: '12px', // Shrink font to help fit
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    mb: 1
                  }}
                >
                  {/* Logo on the left */}
                  <Avatar
                    alt="Pugu Marathon"
                    src="/assets/images/logo.jpeg"
                    sx={{ width: 60, height: 60 }}
                  />

                  {/* Text block on the right */}
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" fontWeight={700} sx={{ fontSize: '14px' }}>
                      PUGU MARATHON
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '10px' }}>
                      Mahali: <strong>Pugu, Dar es Salaam</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '10px' }}>
                      Tarehe: <strong>31-05-2025</strong>
                    </Typography>
                  </Box>
                </Box>
              
                <Divider sx={{ width: '100%', my: 2 }} />

              {/* Details */}
              <Box sx={{ width: '100%' }}>
                {[
                  { label: 'Mkoa-Dekania', value: `${selectedData?.region || 'Dar es Salaam'} - ${selectedData?.location || ''}` },
                  { label: 'Jina Kamili', value: selectedData?.full_name },
                  { label: 'T Shirt Size', value: selectedData?.t_shirt_size },
                  { label: 'Umbali wa kukimbia', value: selectedData?.distance },
                  { label: 'Namba Ya Simu', value: selectedData?.phone_number },
                  { label: 'Tarehe', value: selectedData?.created_at },
                  { label: 'Kiasi', value: formatMoney(selectedData?.amount) },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      mb: 0.5
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: '10px', fontWeight: 600 }}>{item.label}:</Typography>
                    <Typography variant="body2" sx={{fontsize: '10px'}}>{item.value}</Typography>
                  </Box>
                ))}
              </Box>
            
              <Divider sx={{ my: 2, width: '100%' }} />
            
              {/* QR Code */}
              <Box sx={{ textAlign: 'center' }}>
                <img
                  crossOrigin="anonymous"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://management.pugumarathon.co.tz/ticket/${selectedData?.transaction_id}`}
                  alt="QR Code"
                  width="80"
                  height="80"
                  style={{ display: 'block', margin: '0 auto' }}
                />
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  Scan QR to view ticket online
                </Typography>
              </Box>
              <Box>
                  <a
                    href="https://pugumarathon.co.tz"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      color: 'blue',
                      textDecoration: 'none',
                      fontSize: '10px',
                      marginTop: '8px',
                    }}
                  >
                    https://pugumarathon.co.tz
                  </a>
                </Box>
            </Box>

              </Box>
            ) : (
              <>
                <CustomSearch handleSearch={handleSearch} />
                {isLoading && tickets.results.length === 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress sx={{ mx: 'auto', my: 3 }} />
                  </Box>
                )}
                {!isLoading && tickets.results.length === 0 && (
                  <Typography
                    sx={{ my: 5 }}
                    align="center"
                    color="inherit"
                    variant="h5"
                    component="div"
                  >
                    Hakuna Tiketi
                  </Typography>
                )}
                {tickets.results.length > 0 && !isLoading && (
                  <>
                    <Box>
                      {tickets.results.map((item, index) => (
                        <Watermark text="Pugu Marathon" key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              justifyContent: "space-between",
                              my: 4,
                              p: 1,
                              border: 1,
                              borderColor: "lightgray",
                            }}
                          >
                            <Typography sx={{ width: { xs: "100%", md: "14%" } }}>{item.full_name}</Typography>
                            <Typography sx={{ width: { xs: "100%", md: "14%" } }}>{item.t_shirt_size}</Typography>
                            <Typography sx={{ width: { xs: "100%", md: "14%" } }}>{item.distance}</Typography>
                            <Typography sx={{ width: { xs: "100%", md: "14%" } }}>{item.location}</Typography>
                            <Typography sx={{ width: { xs: "100%", md: "14%" } }}>{formatMoney(item.amount)}</Typography>
                            <Typography sx={{ width: { xs: "100%", md: "14%" } }}>{item.created_at}</Typography>
                            <Button
                              variant="contained"
                              sx={{ my: 1, width: { xs: "100%", md: "14%" } }}
                              onClick={() => {
                                console.log('Selected Ticket:', item);
                                setSelectedData(item);
                                setViewTicket(true);
                              }}
                            >
                              Ona Tiketi
                            </Button>
                          </Box>
                        </Watermark>
                      ))}
                    </Box>
                    <TablePagination
                      component="div"
                      count={tickets.total_results}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleRowsPerPageChange}
                      page={tickets.page > 0 ? tickets.page - 1 : 0}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    />
                  </>
                )}
              </>
            )}
          </Container>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ViewTicket;
