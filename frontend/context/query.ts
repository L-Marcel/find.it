import { useContextSelector } from "use-context-selector";
import { searchContext } from "./search";
import { QueryFunction } from "@tanstack/react-query";

export default function useSearchQuery() {
  return useContextSelector(searchContext, (context) => ({
    query: context.query,
    setQuery: context.setQuery,
  }));
}
