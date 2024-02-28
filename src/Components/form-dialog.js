import * as React from 'react'
import { Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, MenuItem, OutlinedInput, Slide, TextField, Typography, } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { authPostRequest } from '../services/api-service';
import { useLocation } from 'react-router-dom';
import { CREATE } from '../Utils/constant';
import { Attachment, Close } from '@mui/icons-material';
import { otpFormFields } from '../seed/form-fields';

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
}) => {
    const [activeStep, setActiveStep] = React.useState(1);
    const router = useLocation();
    const { pathname } = router;
    const schema = Yup.object().shape(
        fields.reduce((obj, field) => {
            if (field.type === 'email') {
                if (field.notRequired) {
                    obj[field.name] = Yup.string().email(`${field.label} should be email`)
                        .required(`${field.label} is required`).optional()
                } else {
                    obj[field.name] = Yup.string().email(`${field.label} should be email`)
                        .required(`${field.label} is required`)
                }
            } else {
                if (field.notRequired) {
                    obj[field.name] = Yup.string().min(field.minimumCharacters, `${field.label} minimum is ${field.minimumCharacters} characters`)
                        .required(`${field.label} is required`).optional()
                } else {
                    obj[field.name] = Yup.string().min(field.minimumCharacters, `${field.label} minimum is ${field.minimumCharacters} characters`)
                        .required(`${field.label} is required`)
                }
            }
            return obj
        }, {})
    )
    const [serverError, setServerError] = React.useState("")

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            aria-describedby="form-dialog"
            fullWidth={true}
            maxWidth={"md"}
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
                    body = pathname === "/orders/confirming" && action === CREATE ? { data: [body] } : body
                    authPostRequest(
                        activeStep === 1 ? firstCallbackUrl : activeStep === 2 ? secondCallbackUrl : thirdCallbackUrl,
                        body,
                        (data) => {
                            helpers.setSubmitting(false)
                            if (activeStep === 1) {
                                setFields(otpFormFields)
                            }
                            if (activeStep === 2) {
                                setFields([])
                            }
                            if (activeStep === 3) {
                                helpers.resetForm()
                                handleClose()
                            }
                            setActiveStep(activeStep + 1)
                        },
                        (error) => {
                            if (error?.response?.data?.message) {
                                setServerError(error.response.data.message[0])
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
                        <DialogActions>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="close"
                                disabled={isSubmitting}
                                onClick={() => {
                                    handleClose()
                                }}
                            >
                                <Close />
                            </IconButton>
                        </DialogActions>
                        <DialogTitle variant='h4'>{`${dialogTitle}`}</DialogTitle>
                        <DialogContent>
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
                                                margin='normal'
                                                label={field.label}
                                                value={values[field.name]}
                                                error={Boolean(errors[field.name] && touched[field.name])}
                                                helperText={touched[field.name] && errors[field.name]}
                                                onBlur={handleBlur}
                                                onChange={(event) => {
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
                                                    margin="none"
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
                                                <TextField
                                                    id={field.name}
                                                    multiline
                                                    required={field?.notRequired === false}
                                                    name={field.name}
                                                    type={field.type}
                                                    label={field.label}
                                                    margin="normal"
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
                            {activeStep === 2 &&
                                <Typography variant='h6'>
                                    Complete Payment
                                </Typography>
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
                        <DialogActions>
                            <Button
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ?
                                    "Loading..." :
                                    activeStep === 2 ?
                                        "Verify" :
                                        activeStep === 3 ?
                                            "Pay" :
                                            `${action}`
                                }
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    )
}