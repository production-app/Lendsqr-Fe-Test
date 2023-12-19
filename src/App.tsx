// import { useState } from "react";
// import reactLogo from "./assets/react.svg";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage, Login, Users } from "./Pages";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import { QueryClient } from "@tanstack/react-query";
import UserTable from "./Pages/UserTable/UserTable";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

// const localStoragePersister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function App() {
  return (
    <>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/customers/users" element={<Users />} />
            <Route path="/customers/users/:userId" element={<UserTable />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Router>
      </PersistQueryClientProvider>
    </>
  );
}

export default App;
