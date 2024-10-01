"use client";

import "./index.scss";
import Link from "next/link";
import { At, Lock } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";
import Input from "../input";
import z from "zod";
import { FormEvent, useCallback, useEffect, useState } from "react";

const schema = z.object({
  email: z
    .string({ required_error: "É necessário informar um e-mail!" })
    .email("Formato inválido de e-mail!")
    .max(80, "E-mail grande demais!"),
  password: z
    .string({ required_error: "É necessário informar uma senha!" })
    .max(24, "Senha grande demais!")
    .min(8, "Senha pequena demais!"),
});

type Data = z.infer<typeof schema>;

export default function LoginForm() {
  let [errors, setErrors] = useState<Data & { new: boolean }>({
    new: false,
    email: "",
    password: "",
  });

  let [data, setData] = useState<Data>({
    email: "",
    password: "",
  });

  const update = useCallback(
    (at: keyof Data, value: string) => {
      setErrors((errors) => {
        return {
          ...errors,
          new: false,
          [at]: "",
        };
      });
      setData((data) => {
        return {
          ...data,
          [at]: value,
        };
      });
    },
    [setData, setErrors]
  );

  const validate = useCallback(() => {
    let result = schema.safeParse(data);
    if (result.success) {
      setErrors({
        new: false,
        email: "",
        password: "",
      });
    } else {
      setErrors((errors) => {
        var _errors = { ...errors, new: true };
        result.error.errors.forEach((error) => {
          _errors[error.path[0] as keyof Data] = error.message;
        });
        return _errors;
      });
    }
  }, [data, setErrors]);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      validate();
    },
    [validate]
  );

  useEffect(() => {
    if (errors.new) {
      for (let field of Object.keys(errors) as [keyof typeof errors]) {
        if (field === "new") continue;
        else if (errors[field] !== "") {
          let input = document.getElementsByName(field)[0];
          input.focus();
          break;
        }
      }
    }
  }, [errors]);

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
          error={errors["email"]}
          icon={At}
          placeholder="E-mail"
        />
        <Input
          name="password"
          value={data.password}
          onChange={(e) => update("password", e.currentTarget.value)}
          error={errors["password"]}
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
