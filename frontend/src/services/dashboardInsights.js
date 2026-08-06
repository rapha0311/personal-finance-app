export function generateInsights(summary, kpis) {

    const insights = [];

    if (!summary || !kpis) {

        return insights;

    }

    // Saldo

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

    // Receita

    if (kpis.income_variation > 0) {

        insights.push({
            type: "success",
            icon: "📈",
            title: "Receita em crescimento",
            message:
                `Sua receita aumentou ${kpis.income_variation}% em relação ao mês anterior.`
        });

    }

    // Despesas

    if (kpis.expense_variation > 15) {

        insights.push({
            type: "warning",
            icon: "💸",
            title: "Despesas aumentaram",
            message:
                `As despesas cresceram ${kpis.expense_variation}% em relação ao mês passado.`
        });

    }

    // Categoria

    if (kpis.biggest_category) {

        insights.push({
            type: "info",
            icon: "📊",
            title: "Maior categoria",
            message:
                `${kpis.biggest_category.category} concentra ${kpis.biggest_category.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })} em despesas.`
        });

    }

    // Metas

    if (kpis.active_goals > 0) {

        insights.push({
            type: "success",
            icon: "🎯",
            title: "Metas em andamento",
            message:
                `Você possui ${kpis.active_goals} meta(s) ativa(s).`
        });

    }

    return insights;

}