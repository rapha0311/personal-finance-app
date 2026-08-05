import ThemeCard from "../ThemeCard";

function DashboardInsights({ insights }) {

    if (!insights.length) return null;

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

            {insights.map((item, index) => (

                <ThemeCard
                    key={index}
                    className="p-6"
                >

                    <div className="flex items-start gap-4">

                        <span className="text-3xl">
                            {item.icon}
                        </span>

                        <div>

                            <h3 className="font-bold text-lg mb-2">
                                {item.title}
                            </h3>

                            <p className="text-slate-500 dark:text-slate-300">
                                {item.message}
                            </p>

                        </div>

                    </div>

                </ThemeCard>

            ))}

        </div>

    );

}

export default DashboardInsights;