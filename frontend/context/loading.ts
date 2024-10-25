import { useContextSelector } from "use-context-selector";
import { context } from "./provider";

export function useIsLoading() {
  return useContextSelector(context, (context) => context.loading);
}

export default function useLoading() {
  return useContextSelector(context, (context) => ({
    setLoading: context.setLoading,
    loading: context.loading,
  }));
}
