//LIVE SERVER BASE URLs
export const eventHubServiceUrl = "https://service.tuzozatamthilia.info"

//TEST BED BASE URLs
// export const eventHubServiceUrl = "https://www.testbed.service.eventhubtz.com"

//LOCAL SERVER BASE URLs
// export const eventHubServiceUrl = "http://192.168.1.142:3009"

//PAYMENT URLs
export const requestOTPUrl = `${eventHubServiceUrl}/api/v1/resend/otp`
export const verifyOTPUrl = `${eventHubServiceUrl}/api/v1/verify/phone`
export const makePaymentUrl = `${eventHubServiceUrl}/api/v1/pugu/marathon/push/ussd`
export const makeContributionUrl = `${eventHubServiceUrl}/api/v1/pugu/marathon/contribution/push/ussd`
export const getAllPaymentTransactionsUrl = `${eventHubServiceUrl}/api/v1/get/payment/transaction`
export const getTransactionByTransactionIDUrl = `${eventHubServiceUrl}/api/v1/get/transaction/by/transaction/id`
export const getContributionByTransactionIDUrl = `${eventHubServiceUrl}/api/v1/get/contribution/by/transaction/id`
export const getAllRegionsUrl = `${eventHubServiceUrl}/api/v1/get/all/regions`
export const getAllDekaniaUrl = `${eventHubServiceUrl}/api/v1/get/all/dekania`