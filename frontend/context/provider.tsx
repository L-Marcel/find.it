"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { User } from "./user";
import { createContext } from "use-context-selector";
import Cookies from "js-cookie";
import { City } from "./cities";
import { onLogin, onLogout } from "@/app/actions";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";

export type Context = {
  back: (alternative?: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  cities: City[];
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
  cities: City[];
}

export default function Provider({ children, cities }: ProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const _loading = useDebounce(loading, 100);

  //#region Nagivation
  useEffect(() => {
    setHistory((prev) => {
      if (prev[prev.length - 1] === pathname) return prev;
      else return [...prev, pathname];
    });
  }, [pathname, setHistory]);

  const back = useCallback(
    (alternative: string = "/") => {
      if (history.length > 1) {
        setHistory((prev) => prev.slice(0, -1));
        router.back();
      } else if (history.length === 1) {
        setHistory(() => []);
        router.push(alternative);
      }
    },
    [router.back, router.push, setHistory, history]
  );
  //#endregion
  //#region Authentication
  const login = useCallback(
    async (email: string, password: string) => {
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
          onLogin(id).then(() => {
            setLoading(false);
          });
        });
    },
    [setLoading]
  );

  const logout = useCallback(() => {
    setLoading(true);
    const id = Cookies.get("x-auth-id");
    Cookies.remove("x-auth-id");
    Cookies.remove("x-auth-token");
    onLogout(id).then(() => {
      setLoading(false);
    });
  }, [setLoading]);
  //#endregion

  return (
    <context.Provider
      value={{
        back,
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
