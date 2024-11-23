"use client";

import styles from "../index.module.scss";
import {
  At,
  City,
  ClipboardText,
  Hash,
  SolarRoof,
} from "@phosphor-icons/react/dist/ssr";
import Button from "../../button";
import Input from "../../input";
import { FormEvent, useCallback, useEffect, useState } from "react";

import useLoading from "@/context/loading";
import { CreateItemData, itemSchema as createSchema } from "@/context/items";
import Textarea from "@/components/input/area";
import CitySelector from "@/components/header/city/city";
import { User } from "@/context/user";
import TypeSwitch from "@/components/switch/type";
import InputBanner from "@/components/input/banner";
import useNavigation from "@/context/navigation";
import {
  callCreateItemToast,
  callInvalidFormToast,
} from "@/components/ui/toasts";
import { useCity } from "@/context/cities";

const initial: CreateItemData = {
  title: "",
  description: "",
  picture: "",
  type: "FIND",
  complement: "",
  district: "",
  number: "",
  street: "",
};

export type Errors = {
  [key in keyof CreateItemData]: string;
} & {
  new: boolean;
};

interface CreateItemFormProps {
  user: User;
  token: string;
}

export default function CreateItemForm({ user, token }: CreateItemFormProps) {
  //#region States
  const navigation = useNavigation();
  const city = useCity();
  const [banner, setBanner] = useState<string>("");
  const { loading, setLoading } = useLoading();
  const [data, setData] = useState<CreateItemData>(initial);
  const [errors, setErrors] = useState<Errors>({
    new: false,
    ...initial,
  });
  //#endregion

  //#region Form
  const update = useCallback(
    (at: keyof CreateItemData, value: string | boolean) => {
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
    const result = createSchema.safeParse({
      ...data,
      number: data.number?.trim() || undefined,
    });
    if (result.success) {
      setErrors({
        new: false,
        ...initial,
      });
      return true;
    } else {
      setErrors((errors) => {
        const _errors = { ...errors, new: true };
        result.error.errors.reverse().forEach((error) => {
          _errors[error.path[0] as keyof CreateItemData] = error.message;
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
        const parts = city.split(" - ");
        const _city = parts[0];
        const _state = parts[1];
        fetch(`${process.env.API_URL}/items`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...data,
            number: data.number?.trim() || undefined,
            street: data.street?.trim() || undefined,
            district: data.district?.trim() || undefined,
            complement: data.complement?.trim() || undefined,
            state: _state,
            city: _city,
            owner: user.id,
          }),
        })
          .then(async (response) => {
            if (!response.ok) throw await response.json();
            else {
              setLoading(false);
              callCreateItemToast();
              navigation.replace("/users/" + user.id);
            }
          })
          .catch((error) => {
            setLoading(false);
            setErrors({
              new: true,
              ...error.fields,
            });
            callInvalidFormToast();
          });
      } else {
        callInvalidFormToast();
      }
    },
    [data, city, navigation, token, user, validate, setErrors, setLoading]
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

  return (
    <form className={styles.form} onSubmit={submit}>
      <header>
        <h1>
          <b>ENCONTROU</b>, <b>PERDEU</b> OU QUER <b>DOAR</b> ALGO?
        </h1>
        <p>
          Cadastre um novo <b>ITEM</b>
        </p>
        <hr />
      </header>
      <main>
        <InputBanner
          value={banner}
          error={errors["picture"]}
          onFileClear={() => {
            update("picture", "");
            setBanner("");
          }}
          onFileLoaded={(base64, blob) => {
            update("picture", base64);
            const url = URL.createObjectURL(blob);
            setBanner(url);
          }}
        />
        <div>
          <Input
            name="title"
            value={data.title}
            onChange={(e) => update("title", e.currentTarget.value)}
            error={errors["title"]}
            icon={ClipboardText}
            placeholder="Título"
          />
          <TypeSwitch
            type={data.type}
            onChange={(type) => update("type", type)}
          />
        </div>
        <Textarea
          name="description"
          value={data.description}
          onChange={(e) => update("description", e.currentTarget.value)}
          error={errors["description"]}
          icon={At}
          placeholder="Descrição"
        />
        <div>
          <CitySelector small />
          <Input
            name="district"
            value={data.district}
            onChange={(e) => update("district", e.currentTarget.value)}
            error={errors["district"]}
            icon={City}
            placeholder="Bairro"
          />
        </div>
        <Input
          name="street"
          value={data.street}
          onChange={(e) => update("street", e.currentTarget.value)}
          error={errors["street"]}
          icon={SolarRoof}
          type="street"
          placeholder="Rua / avenidade"
        />
        <Input
          name="number"
          value={data.number}
          onChange={(e) => update("number", e.currentTarget.value)}
          error={errors["number"]}
          icon={Hash}
          inputMode="numeric"
          placeholder="Número"
        />
        <Input
          name="complement"
          value={data.complement}
          onChange={(e) => update("complement", e.currentTarget.value)}
          error={errors["complement"]}
          icon={ClipboardText}
          type="complement"
          placeholder="Complemento"
        />
      </main>
      <footer>
        <Button disabled={loading} type="submit" theme="default-fill">
          Criar
        </Button>
        {loading && <p>Criando novo item . . .</p>}
      </footer>
    </form>
  );
}
