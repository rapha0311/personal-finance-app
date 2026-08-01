import ThemeCard from "../ThemeCard";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

function MonthlyChart({ monthlyReport, formatCurrency }) {
    return (
        <ThemeCard className="p-6">

            <h2 className="text-2xl font-bold mb-4">
                📈 Evolução Financeira
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart data={monthlyReport}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip
                        formatter={(value) =>
                            formatCurrency(value)
                        }
                    />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="income"
                        name="Receitas"
                        stroke="#22c55e"
                    />

                    <Line
                        type="monotone"
                        dataKey="expense"
                        name="Despesas"
                        stroke="#ef4444"
                    />

                    <Line
                        type="monotone"
                        dataKey="balance"
                        name="Saldo"
                        stroke="#3b82f6"
                    />

                </LineChart>

            </ResponsiveContainer>

        </ThemeCard>
    );
}

export default MonthlyChart;