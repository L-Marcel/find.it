import { useContextSelector } from "use-context-selector";
import { context } from "./provider";

export default function useLoadingController() {
  return useContextSelector(context, (context) => ({
    setLoading: context.setLoading,
  }));
}

export function isLoading() {
  return useContextSelector(context, (context) => context.loading);
}
