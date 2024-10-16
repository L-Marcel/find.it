"use client";

import { createContext } from "use-context-selector";
import { City } from "./cities";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type Filters = {
  finds: boolean;
  losts: boolean;
  donateds: boolean;
};

export type SearchContext = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  city: City;
  setCity: Dispatch<SetStateAction<City>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export const queryClient = new QueryClient();
export const searchContext = createContext<SearchContext>({} as SearchContext);

interface SearchProviderProps {
  children: ReactNode;
}

export default function SearchProvider({ children }: SearchProviderProps) {
  const [filters, setFilters] = useState<Filters>({
    finds: true,
    donateds: true,
    losts: true,
  });

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
        filters,
        setFilters,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </searchContext.Provider>
  );
}
