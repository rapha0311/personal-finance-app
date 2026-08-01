import ThemeCard from "../ThemeCard";
import { formatCurrency } from "../../utils/Formatters";

function TopExpensesCard({ expenses = [] }) {

    return (

        <ThemeCard className="p-6">

            <h2 className="text-2xl font-bold mb-6">
                💸 Maiores Despesas
            </h2>

            {

                expenses.length === 0 ? (

                    <p className="text-slate-500">
                        Nenhuma despesa encontrada.
                    </p>

                ) : (

                    <div className="space-y-4">

                        {

                            expenses.map(expense => (

                                <div
                                    key={expense.id}
                                    className="
                                        flex
                                        justify-between
                                        items-center
                                        border-b
                                        border-slate-200
                                        dark:border-slate-700
                                        pb-3
                                    "
                                >

                                    <div>

                                        <p className="font-semibold">
                                            {expense.title}
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            {expense.category}
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="font-bold text-red-500">
                                            {formatCurrency(expense.amount)}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {expense.transaction_date}
                                        </p>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </ThemeCard>

    );

}

export default TopExpensesCard;