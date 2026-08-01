function AlertsPanel({ alerts }) {

    if (!alerts || alerts.length === 0) {

        return null;

    }

    return (

        <div
            className="
                bg-yellow-50
                border
                border-yellow-300
                rounded-xl
                p-5
                mb-8
            "
        >

            <h2 className="font-bold text-yellow-800 mb-3">

                ⚠️ Alertas Financeiros

            </h2>

            <ul className="list-disc ml-5">

                {alerts.map((alert, index) => (

                    <li key={index}>

                        {alert}

                    </li>

                ))}

            </ul>

        </div>

    );

}

export default AlertsPanel;