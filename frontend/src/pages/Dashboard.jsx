import { api } from "../api/financeApi";
import Layout from "../components/Layout";
import ThemeCard from "../components/ThemeCard";
import { useDashboard } from "../hooks/useDashboard";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import { formatCurrency } from "../utils/Formatters";
import GoalProgressCard from "../components/dashboard/GoalProgressCard";
import SkeletonDashboard from "../components/dashboard/SkeletonDashboard";
import MonthlyChart from "../components/dashboard/MonthlyChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import GoalsPanel from "../components/dashboard/GoalsPanel";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import NetWorthChart from "../components/dashboard/NetWorthChart";
import TopExpensesCard from "../components/dashboard/TopExpensesCard";
import LatestTransactionsCard from "../components/dashboard/LatestTransactionsCard";
import DashboardKPIs from "../components/dashboard/DashboardKPIs";
import DashboardInsights from "../components/dashboard/DashboardInsights";
import { generateInsights } from "../services/dashboardInsights";
import FinancialScoreCard from "../components/dashboard/FinancialScoreCard";
import {
    calculateFinancialScore,
    getFinancialLevel
} from "../services/financialScore";
import DashboardTopBar from "../components/dashboard/DashboardTopBar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,  
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
    loading,
    netWorth,
    topExpenses,
    latestTransactions,
    goalProgress,
    kpis
} = useDashboard();

const score = kpis
    ? calculateFinancialScore(summary, kpis)
    : 0;

const level = getFinancialLevel(score);

const insights = generateInsights(summary, kpis);

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
    />  

    <DashboardTopBar
    exportExcel={exportExcel}
/>      

    <DashboardFilters
        period={period}
        setPeriod={setPeriod}
    />

  <div className="mb-8">
      <FinancialScoreCard
        score={score}
        level={level}
    />
  </div>

  <div className="mb-8">
      <AlertsPanel alerts={alerts} /> 
  </div>   

  <div className="mb-8">
      <DashboardSummary
      summary={summary}
      comparison={comparison}
  />
  </div>

  <div className="mb-8">
      <DashboardKPIs
          kpis={kpis}
      />
  </div>
  <div className="mb-8">

    {
        goalProgress && (

            <GoalProgressCard
                goal={goalProgress}
            />

        )
    }

</div>

  <div className="mb-8">
      <DashboardInsights
      insights={insights}
  />
  </div>

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

  <MonthlyChart
    monthlyReport={monthlyReport}
    formatCurrency={formatCurrency}
  />

  <IncomeExpenseChart

    summary={summary}

    formatCurrency={formatCurrency}

/>

</div>

  <div className="mb-8">
  <CategoryChart

      categoryExpenses={categoryExpenses}

      formatCurrency={formatCurrency}

  />
  </div>

<div className="mb-8">

    <TopExpensesCard
        expenses={topExpenses}
    />

</div>

<div className="mb-8">

    <LatestTransactionsCard
        transactions={latestTransactions}
    />

</div>

<div className="mb-8">
    <NetWorthChart
        data={netWorth}
    />
</div>

<div className="mb-8">
    <GoalsPanel goals={goals} />
</div>

  </Layout>
);
}

export default Dashboard;