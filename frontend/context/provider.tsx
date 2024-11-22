"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { User } from "./user";
import { createContext } from "use-context-selector";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { callLoginToast, callLogoutToast } from "@/components/ui/toasts";

export type Context = {
  back: (alternative?: string) => void;
  replace: (to: string) => void;
  push: (to: string) => void;
  login: (email: string, password: string, _redirect?: string) => Promise<void>;
  logout: () => void;
  cities: string[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const context = createContext<Context>({} as Context);

type UserWithId = {
  id: string;
} & User;

type DefaultAuth = {
  token: string;
  user: UserWithId;
};

export type SafeAuth = {
  token: string;
  id: string;
};

interface ProviderProps {
  children: ReactNode;
  cities: string[];
}

export default function Provider({ children, cities }: ProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const _loading = useDebounce(loading, 100);

  //#region Nagivation
  const reduce = useCallback((current: string[]) => {
    return current.reduce((acc, value) => {
      if (acc.length > 0 && acc[acc.length - 1] === value) return acc;
      else return [...acc, value];
    }, [] as string[]);
  }, []);

  useEffect(() => {
    setHistory((prev) => {
      if (prev[prev.length - 1] === pathname) return reduce(prev);
      else return reduce([...prev, pathname]);
    });
  }, [reduce, pathname, setHistory]);

  const back = useCallback(
    (alternative: string = "/") => {
      if (history.length > 1) {
        const current = reduce([...history]).slice(0, -1);
        router.replace(current[current.length - 1]);
        setHistory(current);
      } else if (history.length === 1) {
        setHistory(() => [alternative]);
        router.replace(alternative);
      }
    },
    [reduce, router, setHistory, history]
  );

  const replace = useCallback(
    (to: string) => {
      if (history.length > 1) {
        setHistory((prev) => {
          if (prev.length > 2 && prev[prev.length - 2] === to)
            return reduce(prev).slice(0, -1);
          else
            return reduce(
              prev.map((value, i) => (i === prev.length - 1 ? to : value))
            );
        });
      } else {
        setHistory(() => [to]);
      }
      router.replace(to);
    },
    [reduce, router, setHistory, history]
  );

  const push = useCallback(
    (to: string) => {
      setHistory((prev) => {
        if (prev[prev.length - 1] === to) return reduce(prev);
        else return reduce([...prev, to]);
      });
      router.replace(to);
    },
    [reduce, router]
  );
  //#endregion

  //#region Authentication
  const login = useCallback(
    async (email: string, password: string, _redirect?: string) => {
      setLoading(true);
      return await fetch(`${process.env.API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(async (response) => {
          if (!response.ok) throw new Error();
          return await response.json();
        })
        .then(({ token, user: { id } }: DefaultAuth) => {
          Cookies.set("x-auth-id", id, {
            expires: 1,
          });
          Cookies.set("x-auth-token", token, {
            expires: 1,
          });
          setLoading(false);
          callLoginToast();
          replace(_redirect ?? "/");
        });
    },
    [replace, setLoading]
  );

  const logout = useCallback(() => {
    setLoading(true);
    Cookies.remove("x-auth-id");
    Cookies.remove("x-auth-token");
    setLoading(false);
    callLogoutToast();
    replace("/login");
  }, [replace, setLoading]);
  //#endregion

  return (
    <context.Provider
      value={{
        back,
        replace,
        push,
        login,
        logout,
        cities,
        loading: _loading,
        setLoading,
      }}
    >
      {children}
    </context.Provider>
  );
}
