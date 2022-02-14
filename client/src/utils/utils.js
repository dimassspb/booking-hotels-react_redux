export const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

export const currencyFormatter = (data) => {
    return (data.amount).toLocaleString(data.currency, {
        style: "currency",
        currency: data.currency,
    });
};

export const diffDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from);
    const end = new Date(to);
    const diff = Math.round(Math.abs(start - end) / day);
    return diff;
};
