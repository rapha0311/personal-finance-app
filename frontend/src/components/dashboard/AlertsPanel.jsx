function AlertsPanel({ alerts }) {

    if (!alerts || alerts.length === 0) {

        return null;

    }

    const styles = {

        success: {
            icon: "✅",
            bg: "bg-green-50",
            border: "border-green-300",
            text: "text-green-800"
        },

        warning: {
            icon: "⚠️",
            bg: "bg-yellow-50",
            border: "border-yellow-300",
            text: "text-yellow-800"
        },

        info: {
            icon: "ℹ️",
            bg: "bg-blue-50",
            border: "border-blue-300",
            text: "text-blue-800"
        }

    };

    return (

        <div
            className="
                rounded-xl
                p-5
                mb-8
                border
                dark:bg-slate-800
                dark:border-slate-700
            "
        >

            <h2
                className="
                    font-bold
                    text-xl
                    mb-4
                    dark:text-slate-100
                "
            >

                🔔 Alertas Financeiros

            </h2>

            <div className="space-y-3">

                {alerts.map((alert, index) => {

                    const style =
                        styles[alert.type] ||
                        styles.info;

                    return (

                        <div
                            key={index}
                            className={`
                                flex
                                items-start
                                gap-3
                                rounded-lg
                                border
                                p-3
                                ${style.bg}
                                ${style.border}
                            `}
                        >

                            <span className="text-xl">

                                {style.icon}

                            </span>

                            <p
                                className={`
                                    font-medium
                                    ${style.text}
                                `}
                            >

                                {alert.message}

                            </p>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}

export default AlertsPanel;