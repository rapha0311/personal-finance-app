import { useTheme } from "../context/ThemeContext";

function ThemeCard({

    children,

    className = "",

    ...props

}) {

  const { darkMode } = useTheme();

  return (

    <div

      {...props}

      className={`
        rounded-2xl
        border
        shadow-sm
        transition-all
        duration-300

        ${
          darkMode
            ? "bg-slate-800 border-slate-700 text-white"
            : "bg-white border-slate-200 text-slate-900"
        }

        ${className}
      `}
    >

      {children}

    </div>

  );

}

export default ThemeCard;