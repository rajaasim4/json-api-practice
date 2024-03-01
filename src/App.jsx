import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router/Router";

const queryClient = new QueryClient();
const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
