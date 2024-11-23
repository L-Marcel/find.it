"use client";

import { createContext } from "use-context-selector";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cookies from "js-cookie";

export type Filters = {
  finds: boolean;
  losts: boolean;
  donateds: boolean;
};

export type SearchContext = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export const queryClient = new QueryClient();
export const searchContext = createContext<SearchContext>({} as SearchContext);

interface SearchProviderProps {
  children: ReactNode;
  city?: string;
}

export default function SearchProvider({ children, city: initialCity }: SearchProviderProps) {
  const [filters, setFilters] = useState<Filters>({
    finds: true,
    donateds: true,
    losts: true,
  });

  const [query, setQuery] = useState<string>("");
  const [city, setCity] = useState<string>(() => { 
    if(initialCity) return initialCity;
    return Cookies.get("@find.it/city") || "Natal - RN";
  });
  
  useEffect(() => {
    Cookies.set("@find.it/city", city, { expires: 7 });
  }, [city]);

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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </searchContext.Provider>
  );
}
