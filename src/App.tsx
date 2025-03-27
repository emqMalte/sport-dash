// import "./App.css";
import { Schedule } from "./components/Schedule";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react";

const queryClient = new QueryClient();

function App() {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <>
          <main className="container mx-auto">
            <Schedule />
          </main>
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}

export default App;