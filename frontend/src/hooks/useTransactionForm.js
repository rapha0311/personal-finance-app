import { useEffect, useState } from "react";

import {
    getCategories,
    createTransaction,
    updateTransaction,
    removeTransaction
} from "../services/transactionService";
import { getGoals } from "../services/goalService";
import { useConfirm } from "../hooks/useConfirm";

export function useTransactionForm(loadTransactions) {

    const { confirm } = useConfirm();

    const [editingId, setEditingId] = useState(null);

    const [categories, setCategories] = useState([]);

    const [goals, setGoals] = useState([]);

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

    const initialFormData = {
    title: "",
    amount: "",
    transaction_type: "expense",
    category_id: "",
    goal_id: "",
    goal_amount: "",
    transaction_date: new Date()
        .toISOString()
        .split("T")[0],
};

    const [formData, setFormData] = useState(initialFormData);
    

    useEffect(() => {
        async function initialize() {

            await Promise.all([
                fetchCategories(),
                fetchGoals()
            ]);

        }

        initialize();

}, []);

    async function fetchCategories() {

    try {

        const data = await getCategories();

        setCategories(data);

    } catch(error){

        console.error(error);

    }

}

    async function fetchGoals() {

    try{

        const data = await getGoals();

        setGoals(data);

    } catch(error){

        console.error(error);

    }   

}

    async function saveTransaction() {

        setLoading(true);

        if (!formData.title.trim()) {

    setError("Informe um título.");

    return;

}

if (!formData.amount || Number(formData.amount) <= 0) {

    setError("Informe um valor válido.");

    return;

}

if (!formData.category_id) {

    setError("Selecione uma categoria.");

    return;

}

        const payload = {
            title: formData.title,
            amount: Number(formData.amount),
            transaction_type: formData.transaction_type,
            category_id: Number(formData.category_id),
            goal_id: formData.goal_id
                ? Number(formData.goal_id)
                : null,
            goal_amount: formData.goal_amount
                ? Number(formData.goal_amount)
                : null,
            transaction_date: formData.transaction_date
        };

        try {

            if (editingId) {

                await updateTransaction(
                    editingId,
                    payload
                );

            } else {

                await createTransaction(
                    payload
                );

            }

            await loadTransactions();

            clearForm();

        } catch (error) {

            setError(error.message ||

            "Erro ao salvar transação");
            
            console.error(error);

        } finally {

            setLoading(false);
        }

    }

    async function deleteTransaction(id) {

        if (!confirm())
            return;

        try{

            await removeTransaction(id);

            await loadTransactions();

        }catch(error){

            console.error(error);

            setError(

                error.message ||

                "Erro ao excluir transação"

            );

        }

    }

    function editTransaction(transaction) {

        setFormData({

            ...initialFormData,

            title: transaction.title,

            amount: transaction.amount,

            transaction_type: transaction.transaction_type,

            category_id: transaction.category_id,

            goal_id: transaction.goal_id ?? "",

            goal_amount: transaction.goal_amount ?? "",

            transaction_date: transaction.transaction_date

        });

        setEditingId(transaction.id);

    }

    function clearForm() {

    setEditingId(null);

    setFormData(initialFormData);

}

    return {

    formData,

    setFormData,

    categories,

    goals,

    editingId,

    loading,

    error,

    saveTransaction,

    editTransaction,

    deleteTransaction,

    clearForm,

};

}