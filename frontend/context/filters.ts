import { useContextSelector } from "use-context-selector";
import { searchContext } from "./search";

export default function useFilters() {
  return useContextSelector(searchContext, (context) => {
    return {
      setFilters: context.setFilters,
      finds: context.filters.finds,
      losts: context.filters.losts,
      donateds: context.filters.donateds,
    };
  });
}
