"use client";

import { createContext } from "use-context-selector";
import { City } from "./cities";
import { ReactNode, useState } from "react";

export type SearchContext = {
  query: string;
  setQuery: (query: string) => void;
  city: City;
  setCity: (city: City) => void;
};

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
      {children}
    </searchContext.Provider>
  );
}
