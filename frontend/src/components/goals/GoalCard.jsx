import ThemeButton from "../ThemeButton";
import { useTheme } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/Formatters";

function GoalCard({

    goal,

    onEdit,

    onDelete

}) {

    const { darkMode } = useTheme();

    const progress = Math.min(goal.percentage, 100);

    const isExceeded = goal.percentage > 100;

    return (

        <div
            className="                
                p-6
                rounded-xl
                shadow
            "
        >

            <h2 className="text-xl font-bold mb-4">
                {goal.title}
            </h2>

            <div className="space-y-1">

            <p>
                <span className="font-semibold">Meta:</span> {formatCurrency(goal.target_amount)}
            </p>

            <p>
                <span className="font-semibold">Gasto:</span> {formatCurrency(goal.current_amount)}
            </p>

            <p>
                <span className="font-semibold">Restante:</span> {formatCurrency(goal.remaining)}
            </p>

            </div>

            <p className="font-bold mt-2">
                Progresso: {goal.percentage}%
            </p>

            <div
                className={`
                    w-full
                    rounded-full
                    h-4
                    mt-3
                    ${
                        darkMode
                            ? "bg-slate-700"
                            : "bg-gray-200"
                    }
                `}
            >

                <div
                    className={`
                        h-4
                        rounded-full
                        ${
                            isExceeded
                                ? "bg-rose-600"
                                : "bg-emerald-600"
                        }
                    `}
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>

            <div className="mt-4 flex gap-2">

                <ThemeButton
                    color="green"
                    onClick={() => onEdit(goal)}
                >
                    Editar
                </ThemeButton>

                <ThemeButton
                    color="red"
                    onClick={() => onDelete(goal.id)}
                >
                    Excluir
                </ThemeButton>

            </div>

        </div>

    );

}

export default GoalCard;