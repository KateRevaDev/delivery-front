import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { store } from "./store";
import { Provider } from "react-redux";
import App from "./App";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
