"use client";

import "./index.scss";
import Link from "next/link";
import { At, Lock, Phone, User } from "@phosphor-icons/react";
import Button from "../button";
import Input from "../input";
import z from "zod";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { setTimeout } from "timers";
import { redirect } from "next/navigation";

const schema = z
  .object({
    name: z
      .string()
      .min(1, "É necessário informar um nome!")
      .min(8, "Nome pequeno demais!")
      .max(90, "Nome muito grande!"),
    email: z
      .string()
      .min(1, "É necessário informar um e-mail!")
      .email("Formato inválido de e-mail!")
      .max(80, "E-mail grande demais!"),
    phone: z
      .string()
      .min(1, "É necessário informar um telefone!")
      .regex(/^\d+$/gm, "Utilize apenas números!")
      .regex(/^(\d{2}[9]?\d{8}|\d{10})$/g, "Telefone inválido!"),
    password: z
      .string()
      .min(1, "É necessário informar uma senha!")
      .max(24, "Senha grande demais!")
      .min(8, "Senha pequena demais!"),
    passwordConfirmation: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    { message: "Senhas não coincidem!", path: ["passwordConfirmation"] }
  );

type Data = z.infer<typeof schema>;

const initial: Data = {
  name: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirmation: "",
};

export default function LoginForm() {
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState<Data>(initial);
  let [errors, setErrors] = useState<Data & { new: boolean }>({
    new: false,
    ...initial,
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
        ...initial,
      });
      return true;
    } else {
      setErrors((errors) => {
        var _errors = { ...errors, new: true };
        result.error.errors.reverse().forEach((error) => {
          _errors[error.path[0] as keyof Data] = error.message;
        });
        return _errors;
      });
      return false;
    }
  }, [data, setErrors, setLoading]);

  const submit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validate()) {
        setLoading(true);
        await fetch(`${process.env.API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        })
          .then(async (response) => {
            if (!response.ok) throw await response.json();
            return await response.json();
          })
          .then(() => {
            setTimeout(() => {
              setLoading(false);
              redirect("/login");
            }, 1500);
          })
          .catch((error) => {
            setTimeout(() => {
              setLoading(false);
              setErrors({
                new: true,
                ...error.fields,
              });
            }, 1500);
          });
      }
    },
    [validate, setErrors, setLoading]
  );

  useEffect(() => {
    if (errors.new) {
      for (let field of Object.keys(errors) as [keyof typeof errors]) {
        if (field === "new") continue;
        else if (errors[field] !== "") {
          let element = document.getElementsByName(field)[0];
          element.focus();
          break;
        }
      }
    }
  }, [errors]);

  return (
    <form className="form" onSubmit={submit}>
      <header>
        <h1>
          JUNTE-SE À COMUNIDADE QUE <b>REENCONTRA</b>.
        </h1>
        <p>
          Encontre o que procura na <b>FIND.IT</b>
        </p>
        <hr />
      </header>
      <main>
        <Input
          disabled={loading}
          name="name"
          value={data.name}
          onChange={(e) => update("name", e.currentTarget.value)}
          error={errors["name"]}
          icon={User}
          placeholder="Nome completo"
        />
        <Input
          disabled={loading}
          name="email"
          value={data.email}
          onChange={(e) => update("email", e.currentTarget.value)}
          error={errors["email"]}
          icon={At}
          placeholder="E-mail"
        />
        <Input
          disabled={loading}
          name="phone"
          value={data.phone}
          onChange={(e) => update("phone", e.currentTarget.value)}
          error={errors["phone"]}
          icon={Phone}
          type="phone"
          placeholder="DDD + Telefone"
        />
        <Input
          disabled={loading}
          name="password"
          value={data.password}
          onChange={(e) => update("password", e.currentTarget.value)}
          error={errors["password"]}
          icon={Lock}
          type="password"
          placeholder="Senha"
        />
        <Input
          disabled={loading}
          name="passwordConfirmation"
          value={data.passwordConfirmation}
          onChange={(e) =>
            update("passwordConfirmation", e.currentTarget.value)
          }
          error={errors["passwordConfirmation"]}
          icon={Lock}
          type="password"
          placeholder="Senha"
        />
      </main>
      <footer>
        <Button disabled={loading} theme="default-fill">
          Cadastrar
        </Button>

        {loading ? (
          <p>Cadastrando novo usuário . . .</p>
        ) : (
          <p>
            Já possuí uma conta? <Link href="/register">entrar</Link>
          </p>
        )}
      </footer>
    </form>
  );
}
