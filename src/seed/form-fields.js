export const paymentFormFields = [
    { name: "ticket_owner", type: "text", label: "Ticket Owner", notRequired: false, minimumCharacters: 3 },
    {
        name: "t_shirt_size",
        type: "select",
        label: "T-Shirt Size",
        items: [
            { value: 'Small (S)', label: "Small (S)", },
            { value: 'Medium (M)', label: "Medium (M)", },
            { value: 'Large (L)', label: "Large (L)", },
            { value: 'Extra Large (XL)', label: "Extra Large (XL)", },
            { value: 'ouble Extra Large (XXL)', label: "ouble Extra Large (XXL)", },
            { value: 'Triple Extra Large (XXXL)', label: "Triple Extra Large (XXXL)", },
        ],
        notRequired: false,
        minimumCharacters: 3
    },
    { name: "amount", type: "text", label: "Amount", notRequired: false, minimumCharacters: 3 },
    { name: "phone_number", type: "text", label: "Phone Number (07xxxxxxxx)", notRequired: false, minimumCharacters: 10 },
]

export const donateFormFields = [
    { name: "amount", type: "text", label: "Amount", notRequired: false, minimumCharacters: 3 },
    { name: "phone_number", type: "text", label: "Phone Number (07xxxxxxxx)", notRequired: false, minimumCharacters: 10 },
]

export const otpFormFields = [
    { name: "otp", type: "text", label: "OTP Code", notRequired: false, minimumCharacters: 6 },
]