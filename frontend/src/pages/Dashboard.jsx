import { useTheme } from "../context/ThemeContext";
import { api } from "../api/financeApi";
import Layout from "../components/Layout";
import ThemeCard from "../components/ThemeCard";
import { useDashboard } from "../hooks/useDashboard";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import { formatCurrency } from "../utils/Formatters";
import { useMemo } from "react";
import GoalProgressCard from "../components/dashboard/GoalProgressCard";
import SkeletonDashboard from "../components/dashboard/SkeletonDashboard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";

function Dashboard() {

  const {
    summary,
    categoryExpenses,
    goals,
    monthlyReport,
    alerts,
    comparison,
    period,
    setPeriod,
    loading
} = useDashboard();

console.log("MONTHLY REPORT:", monthlyReport);

  const { darkMode } = useTheme();

  const pieData = useMemo(() => [

{
    name:"Receitas",
    value:summary.monthly_income
},
{
    name:"Despesas",
    value:summary.monthly_expenses
}

], [summary]);

const COLORS = [
  "#22c55e",
  "#ef4444"
];

async function exportExcel() {

  try {

    const response =
      await api.get(
        "/reports/export",
        {
          responseType: "blob"
        }
      );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      "finance_report.xlsx"
    );

    document.body.appendChild(link);

    link.click();

    link.remove();

  } catch (error) {

    console.error(error);

    notify.error("Erro ao exportar relatório.");

  }

}

if (loading) {

  console.log("SUMMARY:", summary);
  console.log("CATEGORY:", categoryExpenses);
  console.log("MONTHLY:", monthlyReport);
  console.log("ALERTS:", alerts);
  console.log("COMPARISON:", comparison);

    return (

        <Layout>

            <SkeletonDashboard />

        </Layout>

    );

}
  return (
  <Layout>

    <DashboardHero
    summary={summary}
    alerts={alerts}
    formatCurrency={formatCurrency}
    exportExcel={exportExcel}
/>

    <div className="mb-6">

  <select
  value={period}
  onChange={(e) =>
    setPeriod(e.target.value)
  }
  className={`
    border
    p-3
    rounded-lg
    transition-all

    ${
      darkMode
        ? "bg-slate-800 text-white border-slate-700"
        : "bg-white text-slate-900 border-slate-300"
    }
  `}
>

<option value="all">Todos</option>
<option value="30">Últimos 30 dias</option>
<option value="90">Últimos 90 dias</option>
<option value="180">Últimos 180 dias</option>
<option value="365">Último ano</option>

  </select>

</div>

    <DashboardSummary
    summary={summary}
    comparison={comparison}
/>

    <div
  className="
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-6
    mt-8
    mb-10
  "
>

  <ThemeCard
    className="
    p-6
  "
  >


<h2
  className="
    text-2xl
    font-bold
    mb-4
  "
>
  📈 Evolução Financeira
</h2>

<ResponsiveContainer
  width="100%"
  height={350}
>

  <LineChart
    data={monthlyReport}
  >

    <CartesianGrid
      strokeDasharray="3 3"
    />

    <XAxis
      dataKey="month"
    />

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

  <ThemeCard
  className="
    p-6
  "
>


<h2
  className="
    text-2xl
    font-bold
    mb-4
  "
>
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

      {pieData.map(
        (entry, index) => (

          <Cell
            key={index}
            fill={COLORS[index]}
          />

        )
      )}
  

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

</div>

<ThemeCard
  className="
    p-6
  "
>

  <h2
    className="
      text-2xl
      font-bold
      mb-4
    "
  >
    📊 Gastos por Categoria
  </h2>

<ResponsiveContainer
width="100%"
height={350}

>


<BarChart
  data={categoryExpenses}
>

  <CartesianGrid
    strokeDasharray="3 3"
  />

  <XAxis
    dataKey="category"
  />

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


<ThemeCard
  className="
    p-6
  "
>
   

  <h2
    className="
      text-2xl
      font-bold
      mb-6
    "
  >
    🎯 Progresso das Metas
  </h2>

  {goals.map(goal => (

<GoalProgressCard

    key={goal.id}

    goal={goal}

/>

))}
</ThemeCard>

  </Layout>
);
}

export default Dashboard;