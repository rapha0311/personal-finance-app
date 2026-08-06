import ThemeButton from "../ThemeButton";

function DashboardTopBar({ exportExcel }) {

    return (

        <div className="flex justify-end mb-6">

            <ThemeButton
                color="green"
                onClick={exportExcel}
                className="px-6 h-12 rounded-xl"
            >
                📊 Exportar Excel
            </ThemeButton>

        </div>

    );

}

export default DashboardTopBar;