"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <NextUIProvider>{children}</NextUIProvider>
          </QueryClientProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
