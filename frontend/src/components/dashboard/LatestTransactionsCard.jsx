import ThemeCard from "../ThemeCard";
import { formatCurrency } from "../../utils/Formatters";

function LatestTransactionsCard({ transactions }) {

    return (

        <ThemeCard className="p-6">

            <h2 className="text-xl font-bold mb-4">

                Últimas Transações

            </h2>

            <div className="space-y-3">

                {transactions.map(item => (

                    <div
                        key={item.id}
                        className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2"
                    >

                        <div>

                            <p className="font-semibold">

                                {item.title}

                            </p>

                            <p className="text-sm text-slate-500">

                                {item.category}

                            </p>

                        </div>

                        <div className="text-right">

                            <p
                                className={
                                    item.transaction_type === "income"
                                        ? "text-green-600 font-bold"
                                        : "text-red-600 font-bold"
                                }
                            >

                                {formatCurrency(item.amount)}

                            </p>

                            <p className="text-xs text-slate-500">

                                {item.transaction_date}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </ThemeCard>

    );

}

export default LatestTransactionsCard;