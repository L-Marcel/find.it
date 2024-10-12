import { useContextSelector } from "use-context-selector";
import { searchContext } from "./search";

export default function useQuery() {
  return useContextSelector(searchContext, (context) => ({
    query: context.query,
    setQuery: context.setQuery,
  }));
}
