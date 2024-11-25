import { useContextSelector } from "use-context-selector";
import { context } from "./provider";

export default function useNavigation() {
  return useContextSelector(context, (context) => ({
    back: context.back,
    replace: context.replace,
    push: context.push,
    remove: context.remove,
  }));
}
