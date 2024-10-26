"use client";

import "../index.scss";
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
  UpdateUserData,
  type User,
  userCreateSchema as createSchema,
  userUpdateSchema as updateSchema,
} from "@/context/user";
import Switch from "../../switch";
import Image from "next/image";
import useLoading from "@/context/loading";
import Unauthorized from "@/errors/Unauthorized";
import { onUpdateUser } from "@/app/actions";
import useNavigation from "@/context/navigation";
import { callUpdateUserToast } from "@/components/ui/toasts";
import CropImageDialogue from "@/components/dialogues/crop";
import { avatarSize } from "@/components/input/sizes";

const initial: UpdateUserData = {
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
  [key in keyof UpdateUserData]: string;
} & {
  new: boolean;
};

interface EditUserFormProps {
  user: User;
  token: string;
}

export default function EditUserForm({ user, token }: EditUserFormProps) {
  //#region States
  const navigation = useNavigation();
  const [updatePassword, setUpdatePassword] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>(
    user.picture ? `${process.env.API_DOMAIN}/users/${user.picture}` : ""
  );
  const { loading, setLoading } = useLoading();
  const [data, setData] = useState<UpdateUserData>({
    contact: user.contact,
    email: user.email,
    name: user.name,
    phone: user.phone,
    picture: user.picture,
    whatsapp: user.whatsapp,
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState<Errors>({
    new: false,
    ...initial,
    contact: "",
    whatsapp: "",
  });
  //#endregion

  //#region Form
  const updateContact = useCallback(
    (at: "email" | "phone") => {
      setErrors((errors) => ({
        ...errors,
        contact: "",
      }));
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
    [setData, setErrors]
  );

  const update = useCallback(
    (at: keyof UpdateUserData, value: string | boolean) => {
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
    const result = updatePassword
      ? createSchema.safeParse(data)
      : updateSchema.safeParse(data);
    if (result.success) {
      setErrors({
        new: false,
        ...initial,
        contact: "",
        whatsapp: "",
      });
      return true;
    } else {
      setErrors((errors) => {
        const _errors = { ...errors, new: true };
        result.error.errors.reverse().forEach((error) => {
          _errors[error.path[0] as keyof UpdateUserData] = error.message;
        });
        return _errors;
      });
      return false;
    }
  }, [data, updatePassword, setErrors]);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validate()) {
        setLoading(true);
        fetch(`${process.env.API_URL}/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...data,
            updatePassword,
            picture: user.picture === data.picture ? undefined : data.picture,
          } as UpdateUserData),
        }).then(async (response) => {
          if (!response.ok && response.status == 401) throw new Unauthorized();
          else if (!response.ok) {
            const error = await response.json();
            setLoading(false);
            setErrors({
              new: true,
              ...error.fields,
            });
          } else {
            onUpdateUser(user.id).finally(() => {
              setLoading(false);
              callUpdateUserToast();
              navigation.replace("/users/" + user.id);
            });
          }
        });
      }
    },
    [
      data,
      token,
      user,
      navigation,
      updatePassword,
      validate,
      setErrors,
      setLoading,
    ]
  );

  useEffect(() => {
    if (errors.new) {
      for (const field of Object.keys(errors) as [keyof typeof errors]) {
        if (field === "new") continue;
        else if (errors[field] !== "") {
          const element = document.getElementsByName(field)[0];
          element?.focus();
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
    <CropImageDialogue
      imageSize={avatarSize}
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
          ALTERE SEU <b>PERFIL</b>.
        </h1>
        <p>
          E reforce sua presença na <b>FIND.IT</b>
        </p>
        <hr />
      </header>
      <main>
        <div id="profile">
          <Avatar />
          <div>
            <Input
              name="name"
              className="w-full"
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
              className="w-full"
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
            error={errors["contact"] ?? errors["email"]}
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
            error={errors["contact"] ?? errors["phone"]}
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
            disabled={!updatePassword}
            value={data.password}
            onChange={(e) => update("password", e.currentTarget.value)}
            error={errors["password"]}
            icon={Lock}
            type="password"
            placeholder="Senha"
          />
          <Input
            name="passwordConfirmation"
            disabled={!updatePassword}
            value={data.passwordConfirmation}
            onChange={(e) =>
              update("passwordConfirmation", e.currentTarget.value)
            }
            error={errors["passwordConfirmation"]}
            icon={Lock}
            type="password"
            placeholder="Confirmação de senha"
          />
          <Switch
            disabled={loading}
            checked={updatePassword}
            onClick={() => {
              setUpdatePassword((updatePassword) => !updatePassword);
              update("password", "");
              update("passwordConfirmation", "");
            }}
          >
            Alterar senha
          </Switch>
        </div>
      </main>
      <footer>
        <Button disabled={loading} type="submit" theme="default-fill">
          Salvar
        </Button>
        {loading && <p>Atualizando dados do usuário . . .</p>}
      </footer>
    </form>
  );
}
