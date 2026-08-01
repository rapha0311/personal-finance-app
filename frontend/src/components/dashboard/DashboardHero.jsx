import ThemeButton from "../ThemeButton";
import { formatCurrency } from "../../utils/Formatters";

function DashboardHero({
  summary,    
  exportExcel
}) {
  return (
    <>
      <div className="flex flex-col lg:flex-row">

        <div
          className="
            mb-8
            rounded-3xl
            p-8
            bg-gradient-to-r
            from-blue-600
            to-indigo-700
            text-white
            shadow-xl
          "
        >

          <h1 className="text-4xl font-bold mb-3">
            Bem-vindo ao Finance Hub
          </h1>

          <p className="text-blue-100 text-lg mb-6">
            Aqui está o resumo financeiro atualizado.
          </p>

          <div className="flex flex-wrap gap-8 text-sm">

            <div>
              <p className="text-blue-200">Receita Total</p>
              <p className="font-bold text-xl">
                {formatCurrency(summary.monthly_income)}
              </p>
            </div>

            <div>
              <p className="text-blue-200">Despesas Totais</p>
              <p className="font-bold text-xl">
                {formatCurrency(summary.monthly_expenses)}
              </p>
            </div>

            <div>
              <p className="text-blue-200">Saldo Atual</p>
              <p className="font-bold text-xl">
                {formatCurrency(summary.current_balance)}
              </p>
            </div>

          </div>

        </div>

        <ThemeButton
          color="green"
          onClick={exportExcel}
        >
          Exportar Excel
        </ThemeButton>

      </div>

    </>
  );
}

export default DashboardHero;