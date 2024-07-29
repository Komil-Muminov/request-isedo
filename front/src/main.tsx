import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./components/Styles/BlocksStyle.css";
import "./components/Pages/Auth/Auth/Auth.css";

// Эти импорты связаны с библиотекой @tanstack/react-query, которая используется для управления запросами к серверу и кэшированием данных.
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Предоставляет контекст для использования react-query во всем приложении. queryClient управляет состоянием кэширования запросов.
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
