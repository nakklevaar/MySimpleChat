export const normalizeDate = (date) => {
    date = new Date(date);
    date.setMinutes(date.getMinutes() + new Date().getTimezoneOffset());
    const datePrettiered =
        Date.now() - date > 31536000000
            ? `${(date.getDate() < 10 ? "0" : "") + date.getDate()}/${(date.getMonth() < 10 ? "0" : "") + date.getMonth()
            }`
            : `${(date.getHours() < 10 ? "0" : "") + date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
            }`;

    return datePrettiered;
};

export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];