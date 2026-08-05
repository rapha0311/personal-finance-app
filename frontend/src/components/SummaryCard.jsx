import ThemeCard from "./ThemeCard";
import { formatCurrency } from "../utils/Formatters";

function SummaryCard({
  title,
  value,
  color,
  change = null,
  changeType = "percentage",
  icon = "📊",
  isNumber = false
}) {
  
  const formattedChange = 
    change === null
      ? null  
      : Math.abs(change);

  const isPositive = Number(change) >= 0;

  const changeColor = isPositive
    ? "text-green-600"
    : "text-red-600";

  return (

  <ThemeCard
    className="
      p-6
      hover:shadow-lg
    "
  >

      <div
        className="
          flex
          items-center
          justify-between
          mb-4
        "
      >

        <h2
          className="
            dark:text-slate-300
            font-medium
          "
        >
          {title}
        </h2>

        <span
          className="
            text-2xl
          "
        >
          {icon}
        </span>

      </div>

      <p
        className={`
          text-3xl
          font-bold
          ${color}
        `}
      >
        {
          isNumber
            ? value
            : formatCurrency(value)
        }
      </p>

      {

        change !== null && (

          <div
            className={`mt-4 flex items-center gap-2 text-sm font-semibold ${changeColor}`}
          >

            <span>

              {
                isPositive
                  ? "▲"
                  : "▼"
              }

            </span>

            <span>

              {

                changeType === "currency"

                  ? formatCurrency(
                      formattedChange
                    )

                  : `${formattedChange}%`

              }

              {" "}
              vs mês anterior

            </span>

          </div>

        )

      }

    </ThemeCard>

  );

}

export default SummaryCard;