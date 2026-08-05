import ThemeCard from "../ThemeCard";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";
import { useMemo } from "react";

const COLORS = [
    "#22c55e",
    "#ef4444"
];

function IncomeExpenseChart({
    summary,
    formatCurrency
}) {

    const pieData = useMemo(() => [

        {
            name: "Receitas",
            value: summary.income
        },

        {
            name: "Despesas",
            value: summary.expenses
        }

    ], [summary]);

    return (

        <ThemeCard className="p-6">

            <h2 className="text-2xl font-bold mb-4">

                🥧 Receitas x Despesas

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label
                    >

                        {pieData.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />

                        ))}

                    </Pie>

                    <Legend />

                    <Tooltip
                        formatter={(value) =>
                            formatCurrency(value)
                        }
                    />

                </PieChart>

            </ResponsiveContainer>

        </ThemeCard>

    );

}

export default IncomeExpenseChart;