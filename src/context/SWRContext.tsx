import React, { ReactNode, createContext, useContext } from 'react';
import useSWR from 'swr';

const SWRContext = createContext<any>(null);

interface SWRProviderProps {
  children: ReactNode;
}
export const SWRProvider = ({ children }: SWRProviderProps) => {
  // Fetcher function to be used by SWR
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const value = {
    useSWR: (url: string) => useSWR(url, fetcher),
  };

  return <SWRContext.Provider value={value}>{children}</SWRContext.Provider>;
};

export const useSWRContext = () => useContext(SWRContext);