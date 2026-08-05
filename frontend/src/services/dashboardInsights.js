export function generateInsights(summary, kpis) {

    const insights = [];

    if (!summary || !kpis) {

        return insights;

    }

    if (summary.current_balance < 0) {

        insights.push({
            type: "danger",
            icon: "⚠️",
            title: "Saldo negativo",
            message:
                "Você gastou mais do que recebeu neste período."
        });

    } else {

        insights.push({
            type: "success",
            icon: "✅",
            title: "Saldo positivo",
            message:
                "Suas receitas superaram suas despesas."
        });

    }

    return insights;

}