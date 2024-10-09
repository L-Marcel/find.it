"use client";

import { ReactNode, useCallback, useState } from "react";
import { User } from "./user";
import { createContext } from "use-context-selector";

export type Context = {
  user: User | null;
  token: string;
  login: (email: string, password: string) => Promise<Response>;
  logout: () => void;
  bearer: () => string;
};

export const context = createContext<Context>({} as Context);

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

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
        .then(({ token, ...user }: User & { token: string }) => {
          setToken(`Bearer ${token}`);
          setUser(user);
        });
    },
    [setToken, setUser]
  );
  const logout = useCallback(() => {
    setUser(null);
    setToken("");
  }, [setUser, setToken]);
  //#endregion

  return (
    <context.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </context.Provider>
  );
}
