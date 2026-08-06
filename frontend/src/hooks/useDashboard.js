import { useEffect, useState } from "react";
import { api } from "../api/financeApi";
import {
    getNetWorth,
    getTopExpenses,
    getLatestTransactions,
    getDashboardKPIs
} from "../services/dashboardService";

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

    const [topExpenses, setTopExpenses] = useState([]);

    const [latestTransactions, setLatestTransactions] = useState([]);

    const [kpis, setKpis] = useState(null);  
    
    const [insights, setInsights] = useState([]);

    const [loading, setLoading] = useState(false);

    const [goalProgress, setGoalProgress] = useState(null);

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

async function loadTopExpenses() {

    try {

        const data = await getTopExpenses();

        setTopExpenses(data);

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

    async function loadGoalProgress() {

        try {

            const response =
                await api.get("/goals/progress");

            if (response.data.length > 0) {

                setGoalProgress(response.data[0]);

            } else {

                setGoalProgress(null);

            }

        } catch (error) {

            console.error(error);

        }

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

    setSummary({

        income: response.data.monthly_income,

        expenses: response.data.monthly_expenses,

        current_balance: response.data.current_balance

    });

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

async function loadLatestTransactions() {

    try {

        const data = await getLatestTransactions();

        setLatestTransactions(data);

    } catch (error) {

        console.error(error);

    }

}

async function loadKPIs() {

    try {

        const data = await getDashboardKPIs();

        console.log("KPIS API:", data);

        setKpis(data);

    } catch (error) {

        console.error(error);

    }

}

async function loadInsights() {

    try {

        const response =
            await api.get("/dashboard/insights");

        setInsights(response.data);

    } catch (error) {

        console.error(error);

    }

}


    async function loadDashboard() {

    setLoading(true);

    const {
        startDate,
        endDate
    } = getDateRange();

    try {

        await Promise.all([

            loadSummary(startDate, endDate),

            loadCategoryExpenses(startDate, endDate),

            loadGoals(),

            loadMonthlyReport(),

            loadAlerts(),

            loadComparison(),

            loadNetWorth(),

            loadTopExpenses(),

            loadLatestTransactions(),

            loadKPIs(),   
            
            loadInsights(),

        ]);

    } catch (error) {

        console.error(error);

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

        netWorth,

        topExpenses,

        latestTransactions,

        kpis,

        insights,

    };

}

