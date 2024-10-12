"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { User } from "./user";
import { createContext } from "use-context-selector";
import Cookies from "js-cookie";
import { City } from "./cities";

export type Context = {
  user: User | null;
  token: string;
  id: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  cities: City[];
};

export const context = createContext<Context>({} as Context);

type UserWithId = {
  id: string;
} & User;

type DefaultAuth = {
  token: string;
  user: UserWithId;
};

type SafeAuth = {
  token: string;
  id: string;
};

interface ProviderProps {
  children: ReactNode;
  cities: City[];
}

export default function Provider({ children, cities }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");
  const [id, setId] = useState<string>("");

  //#region Cookie Cycle
  useEffect(() => {
    const cookie = Cookies.get("auth");
    if (cookie) {
      try {
        const data: SafeAuth = JSON.parse(cookie);
        setToken(data.token);
        setId(data.id);
      } catch (_) {
        Cookies.remove("auth");
      }
    }
  }, [setToken]);

  useEffect(() => {
    if (!user && token && id) {
      fetch(`${process.env.API_URL}/users/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        credentials: "include",
      })
        .then(async (response) => {
          if (!response.ok) {
            Cookies.remove("auth");
            setToken("");
            setId("");
            return;
          }

          return await response.json();
        })
        .then(({ id, ...user }: UserWithId) => {
          setUser(user);
          setId(id);
        });
    }
  }, [setToken, setId, setUser, user, id, token]);
  //#endregion

  //#region Authentication
  const login = useCallback(
    async (email: string, password: string) => {
      return await fetch(`${process.env.API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(async (response) => {
          if (!response.ok) throw new Error();
          return await response.json();
        })
        .then(({ token, user: { id, ...user } }: DefaultAuth) => {
          setToken(token);
          setId(id);
          setUser(user);
          Cookies.set("auth", JSON.stringify({ token, id }), {
            expires: 1,
          });
        });
    },
    [setToken, setUser, setId]
  );
  const logout = useCallback(() => {
    setUser(null);
    setToken("");
    setId("");
    Cookies.remove("auth");
  }, [setUser, setToken, setId]);
  //#endregion

  return (
    <context.Provider
      value={{
        user,
        token,
        id,
        login,
        logout,
        cities,
      }}
    >
      {children}
    </context.Provider>
  );
}
