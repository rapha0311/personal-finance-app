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

    // Concentração de despesas

if (

    kpis.biggest_category &&

    summary.expenses > 0 &&

    (kpis.biggest_category.total / summary.expenses) >= 0.5

) {

    insights.push({

        type: "warning",

        icon: "📂",

        title: "Gastos concentrados",

        message: `Mais de 50% das despesas estão na categoria ${kpis.biggest_category.category}.`

    });

}

// Nenhuma meta

if (kpis.active_goals === 0) {

    insights.push({

        type: "info",

        icon: "🎯",

        title: "Crie uma meta",

        message: "Definir metas ajuda a acompanhar sua evolução financeira."

    });

}

// Previsão do próximo mês

if (

    kpis.forecast_next_month !== undefined &&

    kpis.forecast_next_month < 0

) {

    insights.push({

        type: "danger",

        icon: "📉",

        title: "Previsão negativa",

        message: "Sua previsão financeira para o próximo mês indica saldo negativo."

    });

}

    return insights;

}