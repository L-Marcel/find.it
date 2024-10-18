"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { User } from "./user";
import { createContext } from "use-context-selector";
import Cookies from "js-cookie";
import { City } from "./cities";
import { onLogin, onLogout } from "@/app/actions";

export type Context = {
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
  const [loading, setLoading] = useState<boolean>(false);

  //#region Authentication
  const login = useCallback(
    async (email: string, password: string) => {
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
    const id = Cookies.get("x-auth-id");
    Cookies.remove("x-auth-id");
    Cookies.remove("x-auth-token");
    onLogout(id);
  }, []);
  //#endregion

  return (
    <context.Provider
      value={{
        login,
        logout,
        cities,
        loading,
        setLoading,
      }}
    >
      {children}
    </context.Provider>
  );
}
