import SummaryCard from "../SummaryCard";

function DashboardSummary({

    summary,

    comparison

}) {
    const cards = [
{
    title: "Receitas",
    value: summary.monthly_income,
    color: "text-green-600",
    change: comparison.income_change,
    icon: "💰"
},
{
    title: "Despesas",
    value: summary.monthly_expenses,
    color: "text-red-600",
    change: comparison.expense_change,
    icon: "💸"
},
{
    title: "Saldo",
    value: summary.current_balance,
    color: "text-blue-600",
    change: comparison.balance_change,
    changeType: "currency",
    icon: "🏦"
}
];

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {cards.map(card => (

                <SummaryCard

                    key={card.title}

                    {...card}

                />

            ))}

        </div>

    );

}

export default DashboardSummary;