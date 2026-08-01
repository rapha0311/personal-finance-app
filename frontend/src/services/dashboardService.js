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