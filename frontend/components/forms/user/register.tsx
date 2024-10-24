"use client";

import "../index.scss";
import Link from "next/link";
import {
  At,
  Lock,
  Phone,
  UserCircle,
  User as UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import Button from "../../button";
import Input from "../../input";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  CreateUserData,
  type User,
  userCreateSchema as createSchema,
} from "@/context/user";
import Switch from "../../switch";
import File from "../../input/file";
import Image from "next/image";
import useLoading from "@/context/loading";
import useNavigation from "@/context/navigation";

const initial: CreateUserData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  picture: "",
  passwordConfirmation: "",
  contact: "NONE",
  whatsapp: false,
};

export type Errors = {
  [key in keyof CreateUserData]: string;
} & {
  new: boolean;
};

export default function RegisterUserForm() {
  //#region States
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState<string>("");
  const { loading, setLoading } = useLoading();
  const [data, setData] = useState<CreateUserData>(initial);
  const [errors, setErrors] = useState<Errors>({
    new: false,
    ...initial,
    whatsapp: "",
  });
  //#endregion

  //#region Form
  const updateContact = useCallback(
    (at: "email" | "phone") => {
      setData((data) => {
        let contact: User["contact"] = "NONE";

        if (at === "email") {
          switch (data.contact) {
            case "BOTH":
              contact = "PHONE";
              break;
            case "NONE":
              contact = "EMAIL";
              break;
            case "EMAIL":
              contact = "NONE";
              break;
            case "PHONE":
              contact = "BOTH";
              break;
          }
        } else {
          switch (data.contact) {
            case "BOTH":
              contact = "EMAIL";
              break;
            case "NONE":
              contact = "PHONE";
              break;
            case "EMAIL":
              contact = "BOTH";
              break;
            case "PHONE":
              contact = "NONE";
              break;
          }
        }

        const whatsapp: boolean =
          data.whatsapp && (contact === "BOTH" || contact === "PHONE");

        return {
          ...data,
          contact,
          whatsapp,
        };
      });
    },
    [setData]
  );

  const update = useCallback(
    (at: keyof CreateUserData, value: string | boolean) => {
      setErrors((errors) => {
        return {
          ...errors,
          new: false,
          [at]: "",
        };
      });
      setData((data) => {
        let whatsapp: boolean = data.whatsapp;
        if (at === "whatsapp") {
          whatsapp =
            (value as boolean) &&
            (data.contact === "BOTH" || data.contact === "PHONE");
        }

        return {
          ...data,
          [at]: value,
          whatsapp,
        };
      });
    },
    [setData, setErrors]
  );

  const validate = useCallback(() => {
    const result = createSchema.safeParse(data);
    if (result.success) {
      setErrors({
        new: false,
        ...initial,
        whatsapp: "",
      });
      return true;
    } else {
      setErrors((errors) => {
        const _errors = { ...errors, new: true };
        result.error.errors.reverse().forEach((error) => {
          _errors[error.path[0] as keyof CreateUserData] = error.message;
        });
        return _errors;
      });
      return false;
    }
  }, [data, setErrors]);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validate()) {
        setLoading(true);
        fetch(`${process.env.API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(async (response) => {
            if (!response.ok) throw await response.json();
            setLoading(false);
            navigation.replace("/login");
          })
          .catch((error) => {
            setLoading(false);
            setErrors({
              new: true,
              ...error.fields,
            });
          });
      }
    },
    [navigation, data, validate, setErrors, setLoading]
  );

  useEffect(() => {
    if (errors.new) {
      for (const field of Object.keys(errors) as [keyof typeof errors]) {
        if (field === "new") continue;
        else if (errors[field] !== "") {
          const element = document.getElementsByName(field)[0];
          element.focus();
          break;
        }
      }
    }
  }, [errors]);
  //#endregion

  //#region Local Components
  const Avatar = () =>
    avatar ? (
      <Image width={98} height={98} alt="avatar" src={avatar} />
    ) : (
      <UserCircle width={98} height={98} />
    );

  const InputFile = () => (
    <File
      name="picture"
      canClear={!!avatar}
      onFileClear={() => {
        update("picture", "");
        setAvatar("");
      }}
      onFileLoaded={(base64, blob) => {
        update("picture", base64);
        const url = URL.createObjectURL(blob);
        setAvatar(url);
      }}
    />
  );
  //#endregion

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
        <div id="profile">
          <Avatar />
          <div>
            <Input
              name="name"
              value={data.name}
              onChange={(e) => update("name", e.currentTarget.value)}
              error={errors["name"]}
              icon={UserIcon}
              placeholder="Nome completo"
            />
            <InputFile />
          </div>
        </div>
        <div id="profile" className="mobile">
          <div>
            <Avatar />
            <Input
              name="name"
              value={data.name}
              onChange={(e) => update("name", e.currentTarget.value)}
              error={errors["name"]}
              icon={UserIcon}
              placeholder="Nome completo"
            />
          </div>
          <InputFile />
        </div>
        <div>
          <Input
            name="email"
            value={data.email}
            onChange={(e) => update("email", e.currentTarget.value)}
            error={errors["email"]}
            icon={At}
            placeholder="E-mail"
          />
          <Switch
            checked={data.contact === "BOTH" || data.contact === "EMAIL"}
            onClick={() => updateContact("email")}
          >
            Disponibilizar para contato
          </Switch>
        </div>
        <div>
          <Input
            name="phone"
            value={data.phone}
            onChange={(e) => update("phone", e.currentTarget.value)}
            error={errors["phone"]}
            icon={Phone}
            type="phone"
            placeholder="DDD + Telefone"
          />
          <Switch
            checked={data.contact === "BOTH" || data.contact === "PHONE"}
            onClick={() => updateContact("phone")}
          >
            Disponibilizar para contato
          </Switch>
          <Switch
            disabled={
              loading || (data.contact !== "BOTH" && data.contact !== "PHONE")
            }
            checked={data.whatsapp}
            onClick={() => update("whatsapp", !data.whatsapp)}
          >
            Vinculado ao Whatsapp
          </Switch>
        </div>
        <div>
          <Input
            name="password"
            value={data.password}
            onChange={(e) => update("password", e.currentTarget.value)}
            error={errors["password"]}
            icon={Lock}
            type="password"
            placeholder="Senha"
          />
          <Input
            name="passwordConfirmation"
            value={data.passwordConfirmation}
            onChange={(e) =>
              update("passwordConfirmation", e.currentTarget.value)
            }
            error={errors["passwordConfirmation"]}
            icon={Lock}
            type="password"
            placeholder="Confirmação de senha"
          />
        </div>
      </main>
      <footer>
        <Button disabled={loading} type="submit" theme="default-fill">
          Cadastrar
        </Button>

        {loading ? (
          <p>Cadastrando novo usuário . . .</p>
        ) : (
          <p>
            Já possuí uma conta?{" "}
            <Link aria-disabled={loading} href="/register">
              entrar
            </Link>
          </p>
        )}
      </footer>
    </form>
  );
}
