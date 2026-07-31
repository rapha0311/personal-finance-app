import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { api } from "../api/financeApi";
import ThemeCard from "../components/ThemeCard";
import { useTheme } from "../context/ThemeContext";
import {
  LabelList
} from "recharts";

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#DC2626",
  "#F59E0B",
  "#7C3AED",
  "#0891B2"
];

function Analytics() {

  const { darkMode } = useTheme();

  const [summary, setSummary] =
    useState(null);

  const [monthlyData, setMonthlyData] =
    useState([]);

  const [topCategories, setTopCategories] =
    useState([]);

  useEffect(() => {

    async function loadData() {

      const categoriesResponse =
        await api.get(
            "/analytics/top-categories"
  );

setTopCategories(
  categoriesResponse.data
);

      const response =
        await api.get(
          "/analytics/executive-summary"
        );

      setSummary(
        response.data
      );

      const monthlyResponse =
        await api.get(
            "/reports/monthly"
        );

        setMonthlyData(
        monthlyResponse.data
);

    }

    loadData();

  }, []);

  if (!summary) {

    return (
      <Layout>
        <p>Carregando...</p>
      </Layout>
    );

  }

  return (

    <Layout>

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Relatórios Financeiros
      </h1>

      <div
        className="
          grid
          grid-cols-4
          gap-6
        "
      >

        <ThemeCard
  className="
    p-6
  "
        >

          <h3
            className="
              dark:text-slate-300
              mb-2
            "
          >
            Receita Total
          </h3>

          <p
            className="
              text-2xl
              font-bold
              text-green-600
            "
          >
            {summary.income.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL"
              }
            )}
          </p>

        </ThemeCard>

        <ThemeCard
  className="
    p-6
  "
        >

          <h3
            className="
              dark:text-slate-300
              mb-2
            "
          >
            Despesas Totais
          </h3>

          <p
            className="
              text-2xl
              font-bold
              text-red-600
            "
          >
            {summary.expenses.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL"
              }
            )}
          </p>

        </ThemeCard>

        <ThemeCard
  className="
    p-6
  "
        >

          <h3
            className="
              dark:text-slate-300
              mb-2
            "
          >
            Saldo
          </h3>

          <p
            className="
              text-2xl
              font-bold
              text-blue-600
            "
          >
            {summary.balance.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL"
              }
            )}
          </p>

        </ThemeCard>

        <ThemeCard
  className="
    p-6
  "
        >

          <h3
            className="
              dark:text-slate-300
              mb-2
            "
          >
            Maior Categoria
          </h3>

          <p
            className="
              text-xl
              font-bold
            "
          >
            {
              summary.biggest_category
                ?.category
            }
          </p>

          <p
            className="
              dark:text-slate-400
            "
          >
            {
              summary.biggest_category
                ?.total
                .toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL"
                  }
                )
            }
          </p>

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
      mb-6
    "
  >
    Evolução Financeira
  </h2>

  <ResponsiveContainer
    width="100%"
    height={400}
  >

    <LineChart
      data={monthlyData}
    >

    <CartesianGrid
        strokeDasharray="3 3"
        stroke={
            darkMode
            ? "#475569"
            : "#e5e7eb"
        }
    />

      <XAxis
  stroke={
    darkMode
      ? "#e2e8f0"
      : "#334155"
  }
/>

<YAxis
  stroke={
    darkMode
      ? "#e2e8f0"
      : "#334155"
  }
/>

      <Tooltip />

      <Legend
  wrapperStyle={{
    color: darkMode
      ? "#e2e8f0"
      : "#334155"
  }}
/>

      <Line
        type="monotone"
        dataKey="income"
        name="Receitas"
        stroke="#22c55e"
        strokeWidth={3}
      />

      <Line
        type="monotone"
        dataKey="expense"
        name="Despesas"
        stroke="#ef4444"
        strokeWidth={3}
      />

      <Line
        type="monotone"
        dataKey="balance"
        name="Saldo"
        stroke="#3b82f6"
        strokeWidth={3}
      />

    </LineChart>

  </ResponsiveContainer>

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
    Top 5 Categorias
  </h2>

  <ResponsiveContainer
    width="100%"
    height={400}
  >

    <BarChart
      data={topCategories}
      layout="vertical"
    >

      <CartesianGrid
  stroke={
    darkMode
      ? "#475569"
      : "#e5e7eb"
  }
/>

<XAxis
  type="number"
  stroke={
    darkMode
      ? "#e2e8f0"
      : "#334155"
  }
/>

<YAxis
  type="category"
  dataKey="category"
  width={120}
  stroke={
    darkMode
      ? "#e2e8f0"
      : "#334155"
  }
/>

      <Tooltip />

      <Bar
  dataKey="total"
  name="Total"
  fill="#22c55e"
>
  <LabelList
    dataKey="total"
    position="top"
  />
</Bar>

    </BarChart>

  </ResponsiveContainer>    

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
    Distribuição dos Gastos
  </h2>

  <ResponsiveContainer
    width="100%"
    height={400}
  >

    <PieChart>

      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        outerRadius={140}
        innerRadius={70}
        label
      >

        {
          topCategories.map(
            (
              entry,
              index
            ) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index %
                    COLORS.length
                  ]
                }
              />

            )
          )
        }

      </Pie>

      <Tooltip />

      <Legend
  wrapperStyle={{
    color: darkMode
      ? "#e2e8f0"
      : "#334155"
  }}
/>

    </PieChart>

  </ResponsiveContainer>

</ThemeCard>

</ThemeCard>

</ThemeCard>

    </Layout>

  );

}

export default Analytics;