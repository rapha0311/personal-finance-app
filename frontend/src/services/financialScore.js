export function calculateFinancialScore(summary, kpis) {

    if (!summary || !kpis) {

        return 0;

    }

    let score = 0;

    if (summary.current_balance > 0)
        score += 30;

    if (summary.income > summary.expenses)
        score += 20;

    if (kpis.active_goals > 0)
        score += 15;

    if (kpis.pending_bills === 0)
        score += 15;

    if (kpis.forecast_next_month >= 0)
        score += 20;

    return Math.min(score, 100);

}

export function getFinancialLevel(score) {

    if (score >= 80)
        return "Excelente";

    if (score >= 60)
        return "Boa";

    if (score >= 40)
        return "Atenção";

    return "Crítica";

}