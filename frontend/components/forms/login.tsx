"use client";

import "./index.scss";
import Link from "next/link";
import { At, Lock } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";
import Input from "../input";
import { FormEvent, useCallback, useState } from "react";
import useAuth from "@/context/auth";
import { useRouter } from "next/navigation";

type Data = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { push } = useRouter();
  const { login } = useAuth();
  const [hasError, setHasError] = useState<boolean>();
  const [loading, setLoading] = useState(false);

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

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setHasError(false);
    login(data.email, data.password)
      .then(() => {
        setLoading(false);
        push("/");
      })
      .catch(() => {
        setHasError(true);
        setLoading(false);
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
          disabled={loading}
          value={data.email}
          onChange={(e) => update("email", e.currentTarget.value)}
          error={hasError ? "E-mail ou senha incorretos!" : ""}
          icon={At}
          placeholder="E-mail"
        />
        <Input
          name="password"
          disabled={loading}
          value={data.password}
          onChange={(e) => update("password", e.currentTarget.value)}
          icon={Lock}
          type="password"
          placeholder="Senha"
        />
      </main>
      <footer>
        <Button disabled={loading} theme="default-fill">
          Entrar
        </Button>
        <p>
          Ainda não possui uma conta? <Link href="/register">cadastre-se</Link>
        </p>
      </footer>
    </form>
  );
}
