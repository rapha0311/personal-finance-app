export function formatCurrency(value) {

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(Number(value || 0));

}

export function formatPercentage(value) {

    return `${Number(value).toFixed(2)}%`;

}

export function formatDate(date) {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
        "pt-BR"
    );

}

export function formatMonth(month) {

    const months = [

        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"

    ];

    return months[month - 1];

}