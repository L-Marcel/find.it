"use client";

import { createContext } from "use-context-selector";
import { City } from "./cities";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type SearchContext = {
  query: string;
  setQuery: (query: string) => void;
  city: City;
  setCity: (city: City) => void;
};

export const queryClient = new QueryClient();
export const searchContext = createContext<SearchContext>({} as SearchContext);

interface SearchProviderProps {
  children: ReactNode;
}

export default function SearchProvider({ children }: SearchProviderProps) {
  const [query, setQuery] = useState<string>("");
  const [city, setCity] = useState<City>({
    name: "Natal",
    state: "RN",
  });

  return (
    <searchContext.Provider
      value={{
        query,
        setQuery,
        city,
        setCity,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </searchContext.Provider>
  );
}
