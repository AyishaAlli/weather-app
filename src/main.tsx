import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  </StrictMode>
);
