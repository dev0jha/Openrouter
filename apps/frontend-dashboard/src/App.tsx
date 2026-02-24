import { BrowserRouter, Route, Routes } from "react-router";

import { treaty } from "@elysiajs/eden";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { App } from "app";

import "./index.css";
import { ApiKeys } from "./pages/ApiKeys";
import { Credits } from "./pages/Credits";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { ElysiaClientContextProvider } from "./providers/Eden";

const client = treaty<App>("localhost:3000", {
  fetch: {
    credentials: "include",
  },
});

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ElysiaClientContextProvider value={client}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Landing />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/credits"} element={<Credits />} />
            <Route path={"/api-keys"} element={<ApiKeys />} />
          </Routes>
        </BrowserRouter>
      </ElysiaClientContextProvider>
    </QueryClientProvider>
  );
}

export default App;
