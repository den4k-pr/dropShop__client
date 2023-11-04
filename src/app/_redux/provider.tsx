"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'
import { Loading } from "@/components/Layout/preloader";

export const Providers = ({ 
    children 
  }: {
    children: React.ReactNode 
  }) => {

  let persistor = persistStore(store)

  return (
    <Loading>
      <SessionProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </SessionProvider>
    </Loading>
  )
};

