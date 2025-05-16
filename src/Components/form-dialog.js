import * as React from 'react'
import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, MenuItem, OutlinedInput, Slide, TextField, Typography, } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { authPostRequest } from '../services/api-service';
import { Attachment } from '@mui/icons-material';
import { otpFormFields, paymentFormFields } from '../seed/form-fields';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { getContributionByTransactionIDUrl, getTransactionByTransactionIDUrl, makePaymentUrl } from '../seed/url';
import { formatMoney } from '../Utils/constant';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Lottie from 'lottie-react';
import failedAnimation from "../animations/failed_animation.json";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const FormDialog = ({
    open,
    handleClose,
    dialogTitle,
    action,
    fields,
    setFields,
    values,
    firstCallbackUrl,
    secondCallbackUrl,
    thirdCallbackUrl,
    dekania,
}) => {
    const [activeStep, setActiveStep] = React.useState(1);
    const [hasPaid, setHasPaid] = React.useState(false);
    const [paymentDetails, setPaymentDetails] = React.useState({});
    const [transactionID, setTransactionID] = React.useState("");
    const [timeCounter, setTimeCounter] = React.useState(0);
    const schema = Yup.object().shape(
        fields.reduce((obj, field) => {
            if (field.type === 'email') {
                if (field.notRequired) {
                    obj[field.name] = Yup.string().email(`${field.label} lazima iwe email`)
                        .required(`${field.label} ni lazima`).optional()
                } else {
                    obj[field.name] = Yup.string().email(`${field.label} lazima iwe email`)
                        .required(`${field.label} ni lazima`)
                }
            } else if (field.name === 'amount') {
                if (field.notRequired) {
                    obj[field.name] = Yup.number().min(field.minimumAmount, `${field.label} cha chini ni ${field.minimumAmount}`)
                        .required(`${field.label} ni lazima`).optional()
                } else {
                    obj[field.name] = Yup.number().min(field.minimumAmount, `${field.label} cha chini ni ${field.minimumAmount}`)
                        .required(`${field.label} ni lazima`)
                }
            } else {
                if (field.notRequired) {
                    obj[field.name] = Yup.string().min(field.minimumCharacters, `${field.label} cha chini ni ${field.minimumCharacters} characters`)
                        .required(`${field.label} ni lazima`).optional()
                } else {
                    obj[field.name] = Yup.string().min(field.minimumCharacters, `${field.label} cha chini ni ${field.minimumCharacters} characters`)
                        .required(`${field.label} ni lazima`)
                }
            }
            return obj
        }, {})
    )
    const [serverError, setServerError] = React.useState("")
    const printRef = React.useRef();

    const downloadTicket = async () => {
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
        pdf.save(`${paymentDetails?.ticket_owner_first_name}_Ticket.pdf`);
    };

    const getPaymentDetails = React.useCallback(() => {
        if (transactionID !== "") {
            if (timeCounter < 60 && !hasPaid) {
                setTimeCounter(timeCounter + 3);
                authPostRequest(
                    values?.[0]?.event_id ? getTransactionByTransactionIDUrl : getContributionByTransactionIDUrl,
                    {
                        transaction_id: transactionID
                    },
                    (data) => {
                        if (data?.payment_status === "COMPLETED") {
                            setActiveStep(4);
                            setHasPaid(true);
                            setPaymentDetails(data);
                        }
                    },
                    (error) => {
                    }
                );
            } else {
                setActiveStep(4);
            }
        }
    }, [transactionID, timeCounter, hasPaid, values]);

    React.useEffect(() => {
        const timeoutId = setInterval(() => {
            getPaymentDetails();
        }, 3000);

        return () => clearInterval(timeoutId);
    }, [getPaymentDetails]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            aria-describedby="form-dialog"
            fullWidth={true}
            maxWidth={"sm"}
            PaperProps={{
                sx: {
                    borderRadius: 4
                }
            }}
        >
            <Formik
                initialValues={{ ...values[0] }}
                validationSchema={schema}
                onSubmit={(values, helpers) => {
                    // console.log("onSubmit", JSON.stringify(values, null, 2))
                    let body = values
                    for (let i = 0; i < fields.length; i++) {
                        if (fields[i].type === "date") {
                            body = { ...body, [fields[i].name]: values[fields[i].name].format("DD/MM/YYYY") }
                        } else if (fields[i].type === "dateTime") {
                            body = { ...body, [fields[i].name]: values[fields[i].name].format('YYYY-MM-DDTHH:mm:ssZ') }
                        } else if (fields[i].type === "number") {
                            body = { ...body, [fields[i].name]: parseInt(values[fields[i].name]) }
                        } else if (fields[i].name === "region" || fields[i].name === "district" || fields[i].name === "ward") {
                            const newValue = fields[i].items.find((item) => item.value === values[fields[i].name]);
                            if (newValue !== undefined) {
                                body = { ...body, [fields[i].name]: newValue.label }
                            }
                        }
                    }
                    authPostRequest(
                        activeStep === 1 ? firstCallbackUrl : secondCallbackUrl,
                        body,
                        (data) => {
                            helpers.setSubmitting(false)
                            if (activeStep === 1) {
                                setFields(otpFormFields)
                            }
                            if (activeStep === 2) {
                                setFields([])
                                authPostRequest(
                                    thirdCallbackUrl,
                                    { ...body, amount: parseInt(values.amount) },
                                    (data) => {
                                        setTransactionID(data?.data?.transaction_id);
                                    },
                                    (error) => {
                                        if (error?.response?.data?.message) {
                                            setServerError(error.response.data.message)
                                        } else if (error?.response?.data) {
                                            helpers.setErrors(error?.response?.data)
                                        }
                                    }
                                )
                            }
                            setActiveStep(activeStep + 1)
                        },
                        (error) => {
                            if (error?.response?.data?.message) {
                                setServerError(error.response.data.message)
                            } else if (error?.response?.data) {
                                helpers.setErrors(error?.response?.data)
                            }
                            helpers.setSubmitting(false)
                        },
                        fields.some(item => item.type === "file") ? true : false
                    )
                }}
            >
                {({ isSubmitting, values, touched, errors, handleChange, handleBlur, setFieldValue, setValues }) => (
                    <Form
                        noValidate
                        autoComplete="off"
                    >
                        <DialogTitle variant='h4'>
                            <b>{`${dialogTitle}`}</b>
                        </DialogTitle>
                        <DialogContent>
                            {activeStep < 3 &&
                                <>
                                    {fields.map((field, index) => {
                                        if (field.label === "Receiver Ward" && values?.["region"] !== 2) {
                                            return null;
                                        }
                                        if (field.label === "Receiver Street" && values?.["region"] !== 2) {
                                            return null;
                                        }

                                        return (
                                            <React.Fragment key={index}>
                                                {field.type === "select" ?
                                                    <TextField
                                                        id={field.name}
                                                        name={field.name}
                                                        select
                                                        margin='dense'
                                                        label={field.label}
                                                        value={values[field.name]}
                                                        error={Boolean(errors[field.name] && touched[field.name])}
                                                        helperText={touched[field.name] && errors[field.name]}
                                                        onBlur={handleBlur}
                                                        onChange={(event) => {
                                                            if (field.name === "region" && thirdCallbackUrl === makePaymentUrl) {
                                                                if (event.target.value.trim().toLowerCase() === "⁠dar-es-salaam") {
                                                                    setFields([
                                                                        ...paymentFormFields,
                                                                        { name: "location", type: "select", label: "Dekania", items: dekania, notRequired: false, minimumCharacters: 1 }
                                                                    ])
                                                                } else {
                                                                    setFields(paymentFormFields);
                                                                }
                                                            }
                                                            setFieldValue(field.name, event.target.value)
                                                        }}
                                                        fullWidth
                                                    >
                                                        {field.items.map((item, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={item.value}
                                                            >
                                                                {item?.label ? item?.label : item.value}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField> :
                                                    field.type === "file" ?
                                                        <OutlinedInput
                                                            id={field.name}
                                                            placeholder={(values[field.name]?.name) || (values[field.name] !== null) ? "" : field.label}
                                                            readOnly
                                                            required={field?.notRequired === false}
                                                            type="text"
                                                            margin="dense"
                                                            fullWidth
                                                            error={Boolean(errors[field.name] && touched[field.name])}
                                                            startAdornment={(
                                                                <InputAdornment position="start">
                                                                    {(values[field.name]?.name || values[field.name] !== null) &&
                                                                        <Chip
                                                                            label={values[field.name]?.name ? values[field.name]?.name : "Image"}
                                                                            onDelete={() => {
                                                                                setValues({ ...values, [field.name]: null })
                                                                            }}
                                                                        />
                                                                    }
                                                                </InputAdornment>
                                                            )}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    {(values[field.name]?.name) || (values[field.name] !== null) ?
                                                                        <Avatar
                                                                            variant='rounded'
                                                                            alt={values[field.name]?.name}
                                                                            src={values[field.name]?.name ? URL.createObjectURL(values[field.name]) : values[field.name]}
                                                                        /> :
                                                                        <IconButton
                                                                            aria-label="upload picture"
                                                                            component="label"
                                                                        >
                                                                            <input
                                                                                hidden
                                                                                accept="image/*"
                                                                                type="file"
                                                                                onChange={(e) => {
                                                                                    e.preventDefault();
                                                                                    if (e.target.files) {
                                                                                        setValues({ ...values, [field.name]: e.target.files[0] })
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <Attachment />
                                                                        </IconButton>
                                                                    }
                                                                </InputAdornment>
                                                            }
                                                            sx={{ mt: 2 }}
                                                        /> :
                                                        field.type === "otp" ?
                                                            <MuiOtpInput
                                                                value={values[field.name]}
                                                                onChange={(newValue) => {
                                                                    setFieldValue(field.name, newValue)
                                                                }}
                                                                length={6}
                                                                TextFieldsProps={{ size: 'small', placeholder: '-' }}
                                                                sx={{
                                                                    display: "flex",
                                                                    maxWidth: "520px",
                                                                    marginInline: "auto",
                                                                    gap: { xs: "6px", md: "30px" },
                                                                    my: 1,
                                                                }}
                                                            /> :
                                                            field.type === "date" ?
                                                                <DatePicker
                                                                    label={field.label}
                                                                    value={values[field.name]}
                                                                    onChange={(newValue) => {
                                                                        setFieldValue(field.name, newValue)
                                                                    }}
                                                                    slotProps={{
                                                                        textField: {
                                                                            margin: "dense",
                                                                            error: Boolean(errors[field.name] && touched[field.name]),
                                                                            helperText: touched[field.name] && errors[field.name],
                                                                            onBlur: handleBlur,
                                                                            fullWidth: true
                                                                        }
                                                                    }}
                                                                /> :
                                                                <TextField
                                                                    id={field.name}
                                                                    multiline
                                                                    required={field?.notRequired === false}
                                                                    name={field.name}
                                                                    type={field.type}
                                                                    label={field.label}
                                                                    margin="dense"
                                                                    fullWidth
                                                                    value={values[field.name]}
                                                                    error={Boolean(errors[field.name] && touched[field.name])}
                                                                    helperText={touched[field.name] && errors[field.name]}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                />
                                                }
                                            </React.Fragment>
                                        )
                                    })}
                                </>
                            }
                            {activeStep === 2 &&
                                <Typography sx={{ mt: 2 }}>
                                    OTP Code zimetumwa kwenye namba {values.phone_number}
                                </Typography>
                            }
                            {activeStep === 3 &&
                                <DialogContent>
                                    <Typography align='center' variant='h6'>
                                        Tunasubiri malipo kutoka {values.phone_number} ...
                                    </Typography>
                                </DialogContent>
                            }
                            {activeStep === 4 &&
                                <>
                                    {hasPaid &&
                                        <>
                                            <Box>
                                                <Button
                                                    variant="contained"
                                                    sx={{ mr: 2, my: 2 }}
                                                    onClick={downloadTicket}
                                                >
                                                    Download
                                                </Button>

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
                                                            { label: 'Mkoa-Dekania', value: `${paymentDetails?.region || 'Dar es Salaam'} - ${paymentDetails?.location || ''}` },
                                                            { label: 'Jina Kamili', value: `${paymentDetails?.ticket_owner_first_name} ${paymentDetails?.ticket_owner_last_name}` },
                                                            { label: 'T Shirt Size', value: paymentDetails?.t_shirt_size },
                                                            { label: 'Umbali wa kukimbia', value: paymentDetails?.distance },
                                                            { label: 'Namba Ya Simu', value: paymentDetails?.phone_number },
                                                            { label: 'Tarehe', value: dayjs(paymentDetails?.created_at).format("DD-MM-YYYY HH:mm:ss") },
                                                            { label: 'Kiasi', value: formatMoney(paymentDetails?.amount) },
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
                                                                <Typography variant="body2" sx={{ fontsize: '10px' }}>{item.value}</Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>

                                                    <Divider sx={{ my: 2, width: '100%' }} />

                                                    {/* QR Code */}
                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <img
                                                            crossOrigin="anonymous"
                                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://management.pugumarathon.co.tz/ticket/${paymentDetails?.transaction_id}`}
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
                                        </>
                                    }
                                    {!hasPaid &&
                                        <>
                                            <Typography
                                                color="error"
                                                align='center'
                                                sx={{
                                                    mt: 2,
                                                }}
                                            >
                                                Malipo Hayajakamilika
                                            </Typography>
                                            <Lottie
                                                animationData={failedAnimation}
                                                loop={true}
                                                size={20}
                                            />
                                        </>
                                    }
                                </>
                            }
                            <Typography
                                color="error"
                                sx={{
                                    mt: 2,
                                }}
                            >
                                {serverError}
                            </Typography>
                        </DialogContent>
                        {activeStep < 3 &&
                            <DialogActions sx={{ alignItems: "center", justifyContent: "center", gap: 4, pb: 2 }}>
                                {activeStep === 2 &&
                                    <Button
                                        variant='contained'
                                        sx={{
                                            mr: "auto",
                                            fontSize: "12px"
                                        }}
                                    >
                                        Omba OTP
                                    </Button>
                                }
                                <Button
                                    variant='contained'
                                    color='inherit'
                                    onClick={handleClose}
                                >
                                    Ghairi
                                </Button>
                                <Button
                                    variant='contained'
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ?
                                        "Subiri..." :
                                        activeStep === 1 ?
                                            "Endelea" :
                                            activeStep === 2 ?
                                                "Hakiki" :
                                                activeStep === 3 ?
                                                    "Lipa" :
                                                    `${action}`
                                    }
                                </Button>
                            </DialogActions>
                        }
                    </Form>
                )}
            </Formik>
        </Dialog>
    )
}