import { useEffect, useState } from "react";
import {
  getTransactions
} from "../services/transactionService";

export function useTransactions() {

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
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
        ([, value]) => value !== "" && value !== null
    )
);

const data = await getTransactions(activeFilters);

      setTransactions(data);

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

  return {

    transactions,

    loading,

    error,

    loadTransactions,
    
    filters,

    setFilters

  };

}