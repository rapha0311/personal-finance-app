import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

function Layout({ children }) {

    const { darkMode } = useTheme();

    return (

        <div className="flex min-h-screen">

            <Navbar />

            <main

                className={`
                    ml-72
                    flex-1                    
                    p-8
                    transition-colors
                    duration-300

                    ${
                        darkMode
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-900"
                    }
                `}
            >

                {children}

            </main>

        </div>

    );

}

export default Layout;