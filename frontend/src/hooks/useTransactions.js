import { useEffect, useState } from "react";
import {
  getTransactions
} from "../services/transactionService";

export function useTransactions() {

  const [transactions, setTransactions] = useState([]);

  const [pagination, setPagination] = useState({
      page: 1,
      page_size: 10,
      total: 0,
      total_pages: 1
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    page_size: 10,
    search: "",
    transaction_type: "",
    category_id: "",
    start_date: "",
    end_date: ""
});

  async function loadTransactions() {

    setLoading(true);

    try {

      const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(
        ([, value]) =>
            value !== "" &&
            value !== null &&
            value !== undefined
    )
);

const data = await getTransactions(activeFilters);

console.log("API RESPONSE COMPLETA:", data);
console.log("JSON:", JSON.stringify(data, null, 2));

setTransactions(data.transactions);

setPagination({
    page: data.pagination.page,
    page_size: data.pagination.pageSize,
    total: data.pagination.total,
    total_pages: data.pagination.totalPages
});

      setError(null);

    } catch (error) {

      console.error(error);

    setError(

        error.message ||

        "Erro ao carregar transações"

    );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {
    loadTransactions();
}, [filters]);

console.log("HOOK transactions:", transactions);
console.log("É array?", Array.isArray(transactions));

  return {

    transactions,

    pagination,

    loading,

    error,

    loadTransactions,
    
    filters,

    setFilters

  };

}