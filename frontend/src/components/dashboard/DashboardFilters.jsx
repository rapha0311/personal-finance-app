import { useTheme } from "../../context/ThemeContext";

function DashboardFilters({

    period,

    setPeriod

}) {

    const { darkMode } = useTheme();

    return (

        <div className="mb-6">

            <select

                value={period}

                onChange={(e) =>

                    setPeriod(e.target.value)

                }

                className={`

                    border

                    p-3

                    rounded-lg

                    transition-all

                    ${

                        darkMode

                            ? "bg-slate-800 text-white border-slate-700"

                            : "bg-white text-slate-900 border-slate-300"

                    }

                `}

            >

                <option value="all">

                    Todos

                </option>

                <option value="30">

                    Últimos 30 dias

                </option>

                <option value="90">

                    Últimos 90 dias

                </option>

                <option value="180">

                    Últimos 180 dias

                </option>

                <option value="365">

                    Último ano

                </option>

            </select>

        </div>

    );

}

export default DashboardFilters;