import { useContextSelector } from "use-context-selector";
import { searchContext } from "./search";

export default function useSearchQuery() {
  return useContextSelector(searchContext, (context) => ({
    query: context.query,
    setQuery: context.setQuery,
  }));
}
