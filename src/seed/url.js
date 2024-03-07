//LIVE SERVER BASE URLs
export const eventHubServiceUrl = "https://www.service.eventhubtz.com"

//TEST BED BASE URLs
// export const eventHubServiceUrl = "https://www.testbed.service.eventhubtz.com"

//LOCAL SERVER BASE URLs
// export const eventHubServiceUrl = "http://192.168.1.142:3009"

//PAYMENT URLs
export const requestOTPUrl = `${eventHubServiceUrl}/api/v1/resend/otp`
export const verifyOTPUrl = `${eventHubServiceUrl}/api/v1/verify/phone`
export const makePaymentUrl = `${eventHubServiceUrl}/api/v1/push/ussd`
export const getAllPaymentTransactionsUrl = `${eventHubServiceUrl}/api/v1/get/payment/transaction`
export const getTransactionByTransactionIDUrl = `${eventHubServiceUrl}/api/v1/get/transaction/by/transaction/id`