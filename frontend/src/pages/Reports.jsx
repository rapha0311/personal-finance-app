import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { api } from "../api/financeApi";
import ThemeCard from "../components/ThemeCard";
import ThemeButton from "../components/ThemeButton";
import { useTheme } from "../context/ThemeContext";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function Reports() {

  const { darkMode } = useTheme();

  const [reportData, setReportData] =
    useState([]);

  useEffect(() => {

    async function loadReport() {

      const response =
        await api.get(
          "/reports/monthly"
        );

      setReportData(
        response.data
      );
    }

    loadReport();

  }, []);

  const formatCurrency = (
    value
  ) => {

    return new Intl.NumberFormat(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL"
      }
    ).format(value);

  };

  return (
    <Layout>

      <h1 className="text-4xl font-bold mb-8">
        Relatórios
      </h1>

      <ThemeCard className="p-6">

        <h2 className="
          text-2xl
          font-bold
          mb-6
        ">
          Evolução Financeira
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <LineChart
            data={reportData}
          >

            <CartesianGrid
            stroke={
              darkMode
                ? "#475569"
                : "#e5e7eb"
            }
          />

            <XAxis
            dataKey="month"
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

            <Tooltip
              formatter={(value) =>
                formatCurrency(value)
              }
            />

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
            />

            <Line
              type="monotone"
              dataKey="expense"
              name="Despesas"
            />

            <Line
              type="monotone"
              dataKey="balance"
              name="Saldo"
            />

          </LineChart>

        </ResponsiveContainer>

      </ThemeCard>

    </Layout>
  );
}

export default Reports;