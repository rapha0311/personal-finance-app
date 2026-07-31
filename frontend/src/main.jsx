import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";

import App from "./App";
import "./index.css";
import {
  ThemeProvider
} from "./context/ThemeContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>

      <ThemeProvider>

        <LoadingProvider>

          <App />          

        </LoadingProvider>

      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>
);
