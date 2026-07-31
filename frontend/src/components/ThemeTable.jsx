import { useTheme } from "../context/ThemeContext";

function ThemeTable({
    children,
    className = "",
    ...props
}) {

    const { darkMode } = useTheme();

    return (

        <table

            {...props}

            className={`
                w-full
                border-collapse

                ${
                    darkMode
                        ? "text-white"
                        : "text-slate-900"
                }

                ${className}
            `}
        >

            {children}

        </table>

    );

}

export default ThemeTable;