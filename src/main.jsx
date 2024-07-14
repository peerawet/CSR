import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { EmployeesKpiToolsProvider } from "./contexts/EmployeesKpiTool.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EmployeesKpiToolsProvider>
      <App />
    </EmployeesKpiToolsProvider>
  </React.StrictMode>
);
