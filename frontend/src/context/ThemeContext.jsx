import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [darkMode, setDarkMode] = useState(() => {

        return localStorage.getItem("darkMode") === "true";

    });

    useEffect(() => {

        localStorage.setItem(
            "darkMode",
            darkMode
        );

    }, [darkMode]);

    function toggleTheme() {

        setDarkMode(prev => !prev);

    }

    const value = useMemo(() => ({

        darkMode,

        toggleTheme

    }), [darkMode]);

    return (

        <ThemeContext.Provider value={value}>

            {children}

        </ThemeContext.Provider>

    );

}

export function useTheme() {

    const context = useContext(ThemeContext);

    if (!context) {

        throw new Error(
            "useTheme deve ser usado dentro de ThemeProvider."
        );

    }

    return context;

}