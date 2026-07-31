import { useEffect, useState } from "react";
import {
  getTransactions
} from "../services/transactionService";

export function useTransactions() {

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  async function loadTransactions() {

    setLoading(true);

    try {

      const data = await getTransactions();

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

  }, []);

  return {

    transactions,

    loading,

    error,

    loadTransactions    

  };

}