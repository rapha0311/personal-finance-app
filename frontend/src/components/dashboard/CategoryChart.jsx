import ThemeCard from "../ThemeCard";
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar
} from "recharts";

function CategoryChart({

    categoryExpenses,

    formatCurrency

}) {

    return (

        <ThemeCard className="p-6">

            <h2 className="text-2xl font-bold mb-4">

                📊 Gastos por Categoria

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart
                    data={categoryExpenses}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="category" />

                    <YAxis />

                    <Tooltip
                        formatter={(value) =>
                            formatCurrency(value)
                        }
                    />

                    <Bar
                        dataKey="total"
                        fill="#22c55e"
                    />

                </BarChart>

            </ResponsiveContainer>

        </ThemeCard>

    );

}

export default CategoryChart;