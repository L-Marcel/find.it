"use client";

import useQuery from "@/context/query";
import Input from "../input";

export default function Query() {
  const { query, setQuery } = useQuery();

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.currentTarget.value)}
      placeholder="Buscar por . . ."
    />
  );
}
