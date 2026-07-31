import { createContext, useContext, useState, useEffect } from "react";
import {
    registerLoadingFunctions
} from "../services/loadingService";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {

    const [loading, setLoading] = useState(false);

    function showLoading() {
        setLoading(true);
    }

    function hideLoading() {
        setLoading(false);
    }

    useEffect(() => {
        registerLoadingFunctions(
            showLoading,
            hideLoading
        );
    }, []);

    return (

        <LoadingContext.Provider
            value={{
                loading,
                showLoading,
                hideLoading
            }}
        >
            {children}
        </LoadingContext.Provider>

    );

}

export function useLoading() {

    return useContext(LoadingContext);

}