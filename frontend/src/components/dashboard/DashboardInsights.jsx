import ThemeCard from "../ThemeCard";

function DashboardInsights({ insights }) {

    if (!insights.length) return null;

    const styles = {

        success: {
            border: "border-green-500",
            bg: "bg-green-50 dark:bg-green-950/30",
            title: "text-green-700 dark:text-green-300"
        },

        warning: {
            border: "border-yellow-500",
            bg: "bg-yellow-50 dark:bg-yellow-950/30",
            title: "text-yellow-700 dark:text-yellow-300"
        },

        danger: {
            border: "border-red-500",
            bg: "bg-red-50 dark:bg-red-950/30",
            title: "text-red-700 dark:text-red-300"
        },

        info: {
            border: "border-blue-500",
            bg: "bg-blue-50 dark:bg-blue-950/30",
            title: "text-blue-700 dark:text-blue-300"
        }

    };

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

            {insights.map((item, index) => {

                const style = styles[item.type] ?? styles.info;

                return (

                    <ThemeCard
                        key={index}
                        className={`
                            p-6
                            border-l-4
                            ${style.border}
                            ${style.bg}
                        `}
                    >

                        <div className="flex items-start gap-4">

                            <span className="text-3xl">
                                {item.icon}
                            </span>

                            <div>

                                <h3
                                    className={`
                                        font-bold
                                        text-lg
                                        mb-2
                                        ${style.title}
                                    `}
                                >
                                    {item.title}
                                </h3>

                                <p className="text-slate-500 dark:text-slate-300">
                                    {item.message}
                                </p>

                            </div>

                        </div>

                    </ThemeCard>

                );

            })}

        </div>

    );

}

export default DashboardInsights;