"use client";

import "./index.scss";
import Link from "next/link";
import { At, Lock } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";
import Input from "../input";
import z, { ZodError } from "zod";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const schema = z.object({
  email: z
    .string()
    .email("Formato inválido de e-mail!")
    .max(80, "E-mail grande demais!"),
  password: z
    .string()
    .max(24, "Senha grande demais!")
    .min(8, "Senha pequena demais!"),
});

type Data = z.infer<typeof schema>;

export default function LoginForm() {
  let [canSubmit, setCanSubmit] = useState(false);
  let [errors, setError] = useState<ZodError>();
  let [data, setData] = useState<Data>({
    email: "",
    password: "",
  });

  const dataToValidate = useDebounce(data, 1000);

  function getError(at: keyof Data) {
    if (!errors || dataToValidate[at] === "") return "";

    for (let i = 0; i < errors?.issues.length; i++) {
      let issue = errors?.issues[i];
      if (issue.path[0] === at) return issue.message;
    }

    return "";
  }

  function onDataChanged(at: keyof Data, value: string) {
    setData({
      ...data,
      [at]: value,
    });
  }

  function validate(data: Data = dataToValidate) {
    let result = schema.safeParse(data);
    if (result.success) {
      setError(undefined);
      setCanSubmit(true);
    } else {
      setError(result.error);
      setCanSubmit(false);
    }
  }

  useEffect(() => {
    validate(dataToValidate);
  }, [dataToValidate]);

  return (
    <form className="form">
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
          value={data.email}
          onChange={(e) => onDataChanged("email", e.currentTarget.value)}
          error={getError("email")}
          icon={At}
          placeholder="E-mail"
        />
        <Input
          value={data.password}
          onChange={(e) => onDataChanged("password", e.currentTarget.value)}
          error={getError("password")}
          icon={Lock}
          type="password"
          placeholder="Senha"
        />
      </main>
      <footer>
        <Button disabled={!canSubmit} theme="default-fill">
          Entrar
        </Button>
        <p>
          Ainda não possui uma conta? <Link href="/register">cadastre-se</Link>
        </p>
      </footer>
    </form>
  );
}
