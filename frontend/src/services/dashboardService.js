import { api } from "../api/financeApi";

export async function getNetWorth() {

    const response =
        await api.get("/dashboard/net-worth");

    return response.data;

}