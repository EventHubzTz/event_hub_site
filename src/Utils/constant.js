export const headers = { 'event-hub-sign-auth': `${process.env.REACT_APP_KEY}`, }
export const contentTypeJson = { 'Content-Type': `application/json`, }
export const contentTypeFormData = { 'Content-Type': `multipart/form-data`, }
export const CREATE = "Create";
export const UPDATE = "Update";
export const capitalizeFirstLetter = (str) => {
    return str
        .replace(/_/g, ' ')
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
export function formatMoney(amount, currency = 'TZS') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
}
export function removeUnderscore(word) {
    return word.replace(/_/g, ' ');
}
export const formatDate = (dateString) => {
    const options = {
        // weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
};