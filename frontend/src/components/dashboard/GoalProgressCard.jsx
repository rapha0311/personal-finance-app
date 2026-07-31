import ThemeCard from "../ThemeCard";
import { formatCurrency } from "../../utils/Formatters";

function GoalProgressCard({ goal }) {

    const percentage = Math.min(
        (goal.current_amount / goal.target_amount) * 100,
        100
    );

    return (

        <ThemeCard className="p-5 mb-4">

            <div className="flex justify-between mb-2">

                <h3 className="font-semibold">
                    {goal.title}
                </h3>

                <span>
                    {percentage.toFixed(0)}%
                </span>

            </div>

            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700">

                <div
                    className="h-3 rounded-full bg-green-500 transition-all duration-500"
                    style={{
                        width: `${percentage}%`
                    }}
                />

            </div>

            <div className="flex justify-between mt-3 text-sm">

                <span>

                    {formatCurrency(goal.current_amount)}

                </span>

                <span>

                    {formatCurrency(goal.target_amount)}

                </span>

            </div>

        </ThemeCard>

    );

}

export default GoalProgressCard;