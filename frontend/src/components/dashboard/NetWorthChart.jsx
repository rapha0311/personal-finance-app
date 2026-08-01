import ThemeCard from "../ThemeCard";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

import { formatCurrency } from "../../utils/Formatters";

function NetWorthChart({ data }) {

    return (

        <ThemeCard className="p-6">

            <h2 className="text-2xl font-bold mb-5">
                💼 Evolução do Patrimônio
            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <AreaChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip
                        formatter={(value) =>
                            formatCurrency(value)
                        }
                    />

                    <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#2563eb"
                        fill="#93c5fd"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </ThemeCard>

    );

}

export default NetWorthChart;