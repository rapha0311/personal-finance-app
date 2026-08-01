import ThemeCard from "../ThemeCard";
import GoalProgressCard from "./GoalProgressCard";

function GoalsPanel({ goals }) {

    return (

        <ThemeCard className="p-6">

            <h2 className="text-2xl font-bold mb-6">

                🎯 Progresso das Metas

            </h2>

            {goals.length === 0 ? (

                <p className="text-slate-500">

                    Nenhuma meta cadastrada.

                </p>

            ) : (

                goals.map(goal => (

                    <GoalProgressCard
                        key={goal.id}
                        goal={goal}
                    />

                ))

            )}

        </ThemeCard>

    );

}

export default GoalsPanel;