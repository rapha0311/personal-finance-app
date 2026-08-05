import SummaryCard from "../SummaryCard";

function DashboardKPIs({ kpis }) {

    if (!kpis) return null;

    return (

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">

            <SummaryCard
                title="Contas Pendentes"
                value={kpis.pending_bills ?? 0}
                icon="📅"
                color="text-orange-600"
                isNumber
            />

            <SummaryCard
                title="Valor Pendente"
                value={kpis.pending_amount}
                icon="💳"
                color="text-red-600"
            />

            <SummaryCard
                title="Metas Ativas"
                value={kpis.active_goals ?? 0}
                icon="🎯"
                color="text-blue-600"
                isNumber
            />

            <SummaryCard
                title="Gasto Médio Diário"
                value={kpis.average_daily_expense}
                icon="📊"
                color="text-purple-600"
            />

            <SummaryCard
                title="Previsão Próximo Mês"
                value={kpis.forecast_next_month}
                icon="📈"
                color="text-green-600"
            />

        </div>

    );

}

export default DashboardKPIs;