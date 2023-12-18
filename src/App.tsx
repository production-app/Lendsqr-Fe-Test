// import { useState } from "react";
// import reactLogo from "./assets/react.svg";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage, Login, Users } from "./Pages";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserTable from "./Pages/UserTable/UserTable";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //  queryKey: ["users"],
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/customers/users" element={<Users />} />
            <Route path="/customers/users/:userId" element={<UserTable />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
