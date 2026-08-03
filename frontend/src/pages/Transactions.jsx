import Layout from "../components/Layout";
import { useTransactions } from "../hooks/useTransactions";
import { useTransactionForm } from "../hooks/useTransactionForm";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionPagination from "../components/transactions/TransactionPagination";

function Transactions() {

    const {
    transactions,
    pagination,
    loading,
    error,
    loadTransactions,
    filters,
    setFilters
} = useTransactions();

    const {
        formData,
        setFormData,
        categories,
        goals,
        editingId,
        saveTransaction,
        editTransaction,
        deleteTransaction,
        clearForm
    } = useTransactionForm(loadTransactions);        

    return (
        <Layout>

            <h1 className="text-4xl font-bold mb-8">
                Transações
            </h1>

            <TransactionFilters

                filters={filters}

                setFilters={setFilters}

                categories={categories}

            />

            <TransactionForm

                formData={formData}
                setFormData={setFormData}
                categories={categories}
                goals={goals}
                editingId={editingId}
                onSave={saveTransaction}
                onCancel={clearForm}
            />

            <TransactionTable

                transactions={transactions}
                categories={categories}
                onEdit={editTransaction}
                onDelete={deleteTransaction}
            />

            <TransactionPagination
                pagination={pagination}
                filters={filters}
                setFilters={setFilters}
            />

        </Layout>
    );
}

export default Transactions;