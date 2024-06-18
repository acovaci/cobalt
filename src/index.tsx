import { ThemeProvider } from "@primer/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import { GlobalStateProvider } from "./global-state";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <ThemeProvider colorMode="auto">
            <GlobalStateProvider>
                <App />
            </GlobalStateProvider>
        </ThemeProvider>
    </React.StrictMode>,
);
