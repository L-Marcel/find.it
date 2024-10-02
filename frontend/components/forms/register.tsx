"use client";

import "./index.scss";
import Link from "next/link";
import { At, Lock, Phone, User as UserIcon } from "@phosphor-icons/react";
import Button from "../button";
import Input from "../input";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { setTimeout } from "timers";
import { redirect } from "next/navigation";
import { userSchema as schema, type User } from "@/context/user";

const initial: User = {
  name: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirmation: "",
};

export default function LoginForm() {
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState<User>(initial);
  let [errors, setErrors] = useState<User & { new: boolean }>({
    new: false,
    ...initial,
  });

  const update = useCallback(
    (at: keyof User, value: string) => {
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
          _errors[error.path[0] as keyof User] = error.message;
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
          icon={UserIcon}
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
