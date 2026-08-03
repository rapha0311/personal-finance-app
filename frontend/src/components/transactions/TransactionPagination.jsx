import ThemeButton from "../ThemeButton";
import { useTheme } from "../../context/ThemeContext";

function TransactionPagination({

    pagination,

    filters,

    setFilters

}) {

    const { darkMode } = useTheme();

    const buttonClass = darkMode
        ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
        : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100";

    const activeClass =
        "bg-green-600 text-white border-green-600";

    function goToPage(page) {

        console.log("Página clicada:", page);

        if (
            page < 1 ||
            page > pagination.total_pages
        ) return;

        setFilters(prev => ({
            ...prev,
            page
        }));

    }

    const pages = Array.from(

        { length: pagination.total_pages },

        (_, index) => index + 1

    );

    const start =
        (pagination.page - 1) * pagination.page_size + 1;

    const end = Math.min(
        pagination.page * pagination.page_size,
        pagination.total
    );

    return (

        <div className="flex items-center justify-between mt-6">

            <ThemeButton
                onClick={() => goToPage(pagination.page - 1)}
                disabled={pagination.page === 1}
            >
                ← Anterior
            </ThemeButton>

            <div className="flex flex-col items-center gap-3">

                <div className="flex gap-2 flex-wrap justify-center">

                    {pages.map(page => (

                        <button

                            key={page}

                            onClick={() => goToPage(page)}

                            className={`
                                w-10
                                h-10
                                rounded-lg
                                border
                                transition

                                ${
                                    pagination.page === page
                                        ? activeClass
                                        : buttonClass
                                }
                            `}
                        >

                            {page}

                        </button>

                    ))}

                </div>

                <span
                    className={`
                        text-sm
                        ${
                            darkMode
                                ? "text-slate-400"
                                : "text-slate-500"
                        }
                    `}
                >
                    Página {pagination.page} de {pagination.total_pages}
                </span>

                <span
                    className={`
                        text-sm
                        ${
                            darkMode
                                ? "text-slate-400"
                                : "text-slate-500"
                        }
                    `}
                >
                    Mostrando {start}–{end} de {pagination.total} registros
                </span>

            </div>

            <ThemeButton
                onClick={() => goToPage(pagination.page + 1)}
                disabled={pagination.page === pagination.total_pages}
            >
                Próxima →
            </ThemeButton>

        </div>

    );

}

export default TransactionPagination;