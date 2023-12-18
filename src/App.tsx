// import { useState } from "react";
// import reactLogo from "./assets/react.svg";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage, Login, Users } from "./Pages";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserTable from "./Pages/UserTable/UserTable";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  persister: localStoragePersister,
  queryClient: queryClient,
});
function App() {
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
