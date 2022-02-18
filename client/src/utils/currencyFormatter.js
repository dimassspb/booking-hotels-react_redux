export const currencyFormatter = (value) =>
    value.toLocaleString("ru-RU", { style: "currency", currency: "EUR" });