import { api } from "../api/financeApi";

export async function getTransactions(filters = {}) {

    console.log(filters);
    console.trace();

    const response = await api.get(
        "/transactions",
        {
            params: filters
        }
    );

    return {
        transactions: response.data.items,
        pagination: {
            page: response.data.page,
            pageSize: response.data.page_size,
            total: response.data.total,
            totalPages: response.data.total_pages
        }
    };

}

export async function createTransaction(transaction) {

    const response =
        await api.post(
            "/transactions",
            transaction
        );

    return response.data;

}

export async function updateTransaction(id, transaction) {

    const response =
        await api.put(
            `/transactions/${id}`,
            transaction
        );

    return response.data;

}

export async function removeTransaction(id) {

    await api.delete(
        `/transactions/${id}`
    );

}

export async function getCategories() {

    const response =
        await api.get("/categories");

    return response.data;

}