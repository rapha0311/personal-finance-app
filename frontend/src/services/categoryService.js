import { api } from "../api/financeApi";

export async function getCategories() {

    const { data } = await api.get("/categories");

    return data;

}

export async function createCategory(category) {

    const { data } = await api.post(
        "/categories",
        category
    );

    return data;

}

export async function updateCategory(id, category) {

    const { data } = await api.put(
        `/categories/${id}`,
        category
    );

    return data;

}

export async function deleteCategory(id) {

    const { data } = await api.delete(
        `/categories/${id}`
    );

    return data;

}