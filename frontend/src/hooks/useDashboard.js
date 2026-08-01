import { useEffect, useState } from "react";
import { api } from "../api/financeApi";
import { getNetWorth } from "../services/dashboardService";

export function useDashboard() {

    const [summary, setSummary] = useState({
        monthly_income: 0,
        monthly_expenses: 0,
        current_balance: 0
    });

    const [categoryExpenses, setCategoryExpenses] = useState([]);

    const [goals, setGoals] = useState([]);

    const [monthlyReport, setMonthlyReport] = useState([]);

    const [period, setPeriod] = useState("all");

    const [alerts, setAlerts] = useState([]);

    const [netWorth, setNetWorth] = useState([]);

    const [loading, setLoading] = useState(false);

    const [comparison, setComparison] = useState({
        income_change: 0,
        expense_change: 0,
        balance_change: 0
    });

    function getDateRange() {

        const today = new Date();

        const periodDays = {
            "30": 30,
            "90": 90,
            "180": 180,
            "365": 365
        };

        let startDate = null;

        if (periodDays[period]) {

            startDate = new Date();

            startDate.setDate(
                today.getDate() - periodDays[period]
            );

        }

        return {

            startDate:
                startDate?.toISOString().split("T")[0],

            endDate:
                today.toISOString().split("T")[0]

        };

    }

    async function loadComparison() {

    const response = await api.get(
        "/dashboard/comparison"
    );

    setComparison(response.data);

}

    async function loadNetWorth() {

    try {

        const data = await getNetWorth();

        console.log("API NET WORTH:", data);

        setNetWorth(data);

    } catch (error) {

        console.error(error);

    }

}

    async function loadAlerts() {

    const response = await api.get(
        "/dashboard/alerts"
    );

    setAlerts(response.data);

}

    async function loadGoals() {

    const response = await api.get(
        "/goals/progress"
    );

    setGoals(response.data);

}

    async function loadSummary(startDate, endDate) {

    const response = await api.get(
        "/dashboard/summary",
        {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        }
    );

    setSummary(response.data);

}

    async function loadCategoryExpenses(startDate, endDate) {

    const response = await api.get(
        "/dashboard/categories",
        {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        }
    );

    setCategoryExpenses(response.data);

}

    async function loadMonthlyReport() {

    const response = await api.get(
        "/reports/monthly"
    );

    setMonthlyReport(response.data);

}

    async function loadDashboard() {

    setLoading(true);

    const {
        startDate,
        endDate
    } = getDateRange();

    try {

        console.log("1 - Summary");
        await loadSummary(startDate, endDate);

        console.log("2 - Categories");
        await loadCategoryExpenses(startDate, endDate);

        console.log("3 - Goals");
        await loadGoals();

        console.log("4 - Monthly");
        await loadMonthlyReport();

        console.log("5 - Alerts");
        await loadAlerts();

        console.log("6 - Comparison");
        await loadComparison();

        console.log("7 - NetWorth");
        await loadNetWorth()

        console.log("Dashboard carregado!");

    } catch (error) {

        console.error("ERRO:", error);

    } finally {

        setLoading(false);

    }

}

    useEffect(() => {

        loadDashboard();

    }, [period]);

    return {

        summary,

        categoryExpenses,

        goals,

        monthlyReport,

        alerts,

        comparison,        

        period,

        setPeriod,

        loading,

        netWorth

    };

}