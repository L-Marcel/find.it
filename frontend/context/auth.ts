import { useContextSelector } from "use-context-selector";
import { context } from "./provider";

export default function useAuth() {
  return useContextSelector(context, (context) => ({
    login: context.login,
    logout: context.logout,
    bearer: context.bearer,
  }));
}
