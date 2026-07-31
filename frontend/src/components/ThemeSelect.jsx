import { useTheme } from "../context/ThemeContext";

function ThemeSelect({

    children,

    className = "",

    ...props

}) {

    const { darkMode } = useTheme();

    return (

        <select

            {...props}

            className={`

                border
                p-3
                rounded
                w-full

                transition-colors

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500

                disabled:opacity-50
                disabled:cursor-not-allowed

                ${
                    darkMode
                        ? "bg-slate-700 text-white border-slate-600"
                        : "bg-white text-black border-slate-300"
                }

                ${className}

            `}
        >

            {children}

        </select>

    );

}

export default ThemeSelect;