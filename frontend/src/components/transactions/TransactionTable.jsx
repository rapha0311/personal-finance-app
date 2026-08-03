import { useMemo } from "react";
import ThemeCard from "../ThemeCard";
import ThemeTable from "../ThemeTable";
import ThemeButton from "../ThemeButton";
import { useTheme } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/Formatters";

const TRANSACTION_TYPE_LABEL = Object.freeze({
    income: "Receita",
    expense: "Despesa",
});

function TransactionTable({

    transactions = [],
    categories = [],
    onEdit,
    onDelete

}) {

    const { darkMode } = useTheme();

    const borderClass = darkMode
        ? "border-slate-700"
        : "border-slate-200";

    const categoriesById = useMemo(() => {

        return Object.fromEntries(

            categories.map(category => [

                category.id,
                category.name

            ])

        );

    }, [categories]);

    return (

        <ThemeCard className="p-6 mb-8">

            <ThemeTable className="w-full">

                <thead>

                    <tr className={`border-b ${borderClass}`}>

                        <th className="text-left p-3">
                            Título
                        </th>

                        <th className="text-left p-3">
                            Valor
                        </th>

                        <th className="text-left p-3">
                            Tipo
                        </th>

                        <th className="text-left p-3">
                            Categoria
                        </th>

                        <th className="text-left p-3">
                            Data
                        </th>

                        <th className="text-left p-3">
                            Ações
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {transactions.length === 0 ? (

                        <tr>

                            <td
                                colSpan={6}
                                className="text-center p-6 text-slate-500"
                            >

                                Nenhuma transação encontrada.

                            </td>

                        </tr>

                    ) : (

                        transactions.map(transaction => (

                            <tr
                                key={transaction.id}
                                className={`border-b ${borderClass}`}
                            >

                                <td className="p-3">

                                    {transaction.title}

                                </td>

                                <td className="p-3">

                                    {formatCurrency(transaction.amount)}

                                </td>

                                <td className="p-3">

                                    {TRANSACTION_TYPE_LABEL[transaction.transaction_type]}

                                </td>

                                <td className="p-3">

                                    {categoriesById[transaction.category_id] ??
                                        "Categoria não encontrada"}

                                </td>

                                <td className="p-3">

                                    {transaction.transaction_date}

                                </td>

                                <td className="p-3">

                                    <div className="flex gap-2">

                                        <ThemeButton
                                            color="yellow"
                                            onClick={() => onEdit(transaction)}
                                        >

                                            Editar

                                        </ThemeButton>

                                        <ThemeButton
                                            color="red"
                                            onClick={() => onDelete(transaction.id)}
                                        >

                                            Excluir

                                        </ThemeButton>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </ThemeTable>

        </ThemeCard>

    );

}

export default TransactionTable;