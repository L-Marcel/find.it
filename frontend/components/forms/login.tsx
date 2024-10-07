"use client";

import "./index.scss";
import Link from "next/link";
import { At, Lock } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";
import Input from "../input";
import { FormEvent, useCallback, useState } from "react";
import useAuth from "@/context/auth";

type Data = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { login } = useAuth();
  const [hasError, setHasError] = useState<boolean>();

  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });

  const update = useCallback(
    (at: keyof Data, value: string) => {
      setHasError(false);
      setData((data) => {
        return {
          ...data,
          [at]: value,
        };
      });
    },
    [setData, setHasError]
  );

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login(data.email, data.password).catch(() => {
      setHasError(true);
    });
  }

  return (
    <form className="form" onSubmit={submit}>
      <header>
        <h1>
          <b>BEM VINDO</b> DE VOLTA!
        </h1>
        <p>
          Encontre o que procura na <b>FIND.IT</b>
        </p>
        <hr />
      </header>
      <main>
        <Input
          name="email"
          value={data.email}
          onChange={(e) => update("email", e.currentTarget.value)}
          error={hasError ? "E-mail ou senha incorretos!" : ""}
          icon={At}
          placeholder="E-mail"
        />
        <Input
          name="password"
          value={data.password}
          onChange={(e) => update("password", e.currentTarget.value)}
          icon={Lock}
          type="password"
          placeholder="Senha"
        />
      </main>
      <footer>
        <Button theme="default-fill">Entrar</Button>
        <p>
          Ainda não possui uma conta? <Link href="/register">cadastre-se</Link>
        </p>
      </footer>
    </form>
  );
}
