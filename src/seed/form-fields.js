export const paymentFormFields = [
    { name: "ticket_owner", type: "text", label: "Jina La Mwenye Tiketi", notRequired: false, minimumCharacters: 3 },
    { name: "date_of_birth", type: "date", label: "Tarehe ya Kuzaliwa", notRequired: false, minimumCharacters: 3 },
    {
        name: "distance",
        type: "select",
        label: "Umbali wa Kukimbia",
        items: [
            { value: '2.5 KM', label: "2.5 KM", },
            { value: '5 KM', label: "5 KM", },
            { value: '10 KM', label: "10 KM", },
            { value: '21 KM', label: "21 KM", },
        ],
        notRequired: false,
        minimumCharacters: 3
    },
    {
        name: "t_shirt_size",
        type: "select",
        label: "Saizi ya T-Shirt",
        items: [
            { value: 'Small (S)', label: "Small (S)", },
            { value: 'Medium (M)', label: "Medium (M)", },
            { value: 'Large (L)', label: "Large (L)", },
            { value: 'Extra Large (XL)', label: "Extra Large (XL)", },
            { value: 'Double Extra Large (XXL)', label: "Double Extra Large (XXL)", },
            { value: 'Triple Extra Large (XXXL)', label: "Triple Extra Large (XXXL)", },
        ],
        notRequired: false,
        minimumCharacters: 3
    },
    { name: "amount", type: "number", label: "Kiasi (Unaweza lipa zaidi)", notRequired: false, minimumCharacters: 3 },
    { name: "phone_number", type: "text", label: "Namba ya Simu (07xxxxxxxx)", notRequired: false, minimumCharacters: 10 },
    { name: "location", type: "text", label: "Mahali", notRequired: false, minimumCharacters: 3 },
]

export const donateFormFields = [
    { name: "ticket_owner", type: "text", label: "Jina Kamili", notRequired: false, minimumCharacters: 3 },
    { name: "date_of_birth", type: "date", label: "Tarehe ya Kuzaliwa", notRequired: false, minimumCharacters: 3 },
    { name: "amount", type: "number", label: "Kiasi (Unaweza lipa zaidi)", notRequired: false, minimumCharacters: 3 },
    { name: "phone_number", type: "text", label: "Namba ya Simu (07xxxxxxxx)", notRequired: false, minimumCharacters: 10 },
    { name: "location", type: "text", label: "Mahali", notRequired: false, minimumCharacters: 3 },
]

export const otpFormFields = [
    { name: "otp", type: "otp", label: "OTP Code", notRequired: false, minimumCharacters: 6 },
]