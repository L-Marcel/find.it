"use client";

import styles from "./index.module.scss";
import Link from "next/link";
import { At, Lock } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";
import Input from "../input";
import { FormEvent, useCallback, useEffect, useState } from "react";
import useAuth from "@/context/auth";
import useLoading from "@/context/loading";
import { callUnauthorizedToast } from "../ui/toasts";

type Data = {
  email: string;
  password: string;
};

interface LoginFormProps {
  redirect?: string;
}

export default function LoginForm({ redirect }: LoginFormProps) {
  const { loading, setLoading } = useLoading();
  const { login } = useAuth();
  const [hasError, setHasError] = useState<boolean>(false);

  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        callUnauthorizedToast();
      }, 100);
    }
  }, [redirect]);

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
    login(data.email, data.password, redirect).catch(() => {
      setHasError(true);
      setLoading(false);
    });
  }

  return (
    <form className={styles.form} onSubmit={submit}>
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
        <Button disabled={loading} theme="default-fill">
          Entrar
        </Button>
        <p>
          Ainda não possui uma conta?{" "}
          <Link aria-disabled={loading} href="/register">
            cadastre-se
          </Link>
        </p>
      </footer>
    </form>
  );
}
