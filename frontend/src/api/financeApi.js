import axios from "axios";
import {
    showLoading,
    hideLoading
} from "../services/loadingService";

console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);

export const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

    timeout: 10000,

    headers: {

        "Content-Type": "application/json"

    }

});

api.interceptors.request.use(

    (config) => {

        showLoading();

        return config;

    },

    (error) => {

        hideLoading();

        return Promise.reject(error);
    }

);

api.interceptors.response.use(

    (response) => {
        
        hideLoading();

        return response;

    },

    (error) => {
        
        hideLoading();
        
        return Promise.reject(error);

    }

);

