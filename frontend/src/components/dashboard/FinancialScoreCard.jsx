import ThemeCard from "../ThemeCard";

function FinancialScoreCard({ score, level }) {

    const color = (() => {

        if (score >= 80)
            return "bg-green-500";

        if (score >= 60)
            return "bg-blue-500";

        if (score >= 40)
            return "bg-yellow-500";

        return "bg-red-500";

    })();

    return (

        <ThemeCard className="p-6 mt-8">

            <div className="flex items-center justify-between mb-4">

                <div>

                    <h2 className="text-2xl font-bold">
                        Saúde Financeira
                    </h2>

                    <p className="text-slate-500 dark:text-slate-300">
                        {level}
                    </p>

                </div>

                <div className="text-4xl font-bold">

                    {score}

                </div>

            </div>

            <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">

                <div
                    className={`${color} h-full transition-all duration-700`}
                    style={{
                        width: `${score}%`
                    }}
                />

            </div>

        </ThemeCard>

    );

}

export default FinancialScoreCard;