"use client";

import Input from "../input";
import useSearchQuery from "@/context/query";

export default function Search() {
  const { query, setQuery } = useSearchQuery();

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.currentTarget.value)}
      placeholder="Buscar por . . ."
    />
  );
}
