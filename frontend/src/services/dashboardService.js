import { api } from "../api/financeApi";

export async function getNetWorth() {

    const response =
        await api.get("/dashboard/net-worth");

    return response.data;

}

export async function getTopExpenses() {

    const response = await api.get(
        "/analytics/top-expenses"
    );

    return response.data;

}

export async function getLatestTransactions() {

    const response = await api.get(
        "/dashboard/latest-transactions"
    );

    return response.data;

}

export async function getDashboardKPIs() {

    const response = await api.get(
        "/dashboard/kpis"
    );

    return response.data;

}

export async function getFinancialInsights() {

    const response = await api.get(
        "/dashboard/insights"
    );

    return response.data;

}