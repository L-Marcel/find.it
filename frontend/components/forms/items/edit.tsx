"use client";

import styles from "../index.module.scss";
import {
  City,
  ClipboardText,
  Hash,
  PencilLine,
  SolarRoof,
} from "@phosphor-icons/react/dist/ssr";
import Button from "../../button";
import Input from "../../input";
import { FormEvent, useCallback, useEffect, useState } from "react";

import useLoading from "@/context/loading";
import {
  CreateItemData,
  itemSchema as updateSchema,
  Item,
} from "@/context/items";
import Textarea from "@/components/input/area";
import CitySelector from "@/components/header/city/city";
import TypeSwitch from "@/components/switch/type";
import InputBanner from "@/components/input/banner";
import useNavigation from "@/context/navigation";
import {
  callInvalidFormToast,
  callUpdateItemToast,
} from "@/components/ui/toasts";
import { DialogTrigger } from "@/components/ui/dialog";
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

interface UpdateItemFormProps {
  item: Item;
  token: string;
}

export default function EditItemForm({ item, token }: UpdateItemFormProps) {
  //#region States
  const navigation = useNavigation();
  const city = useCity();
  const [banner, setBanner] = useState<string>(
    item.picture
      ? `${process.env.API_DOMAIN}/items/${item.picture}?v=${item.updatedAt.replace(/ /g, "_")}`
      : ""
  );
  const { loading, setLoading } = useLoading();
  const [data, setData] = useState<CreateItemData>({
    title: item.title,
    description: item.description,
    picture: item.picture,
    type: item.type,
    complement: item.complement,
    district: item.district,
    number: item.number > 0 ? item.number.toString() : "",
    street: item.street,
  });
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
    const result = updateSchema.safeParse({
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
        fetch(`${process.env.API_URL}/items/${item.id}`, {
          method: "PUT",
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
            picture: data.picture === item.picture ? undefined : data.picture,
            state: _state,
            city: _city,
            owner: item.user.id,
          }),
        })
          .then(async (response) => {
            if (!response.ok) throw await response.json();
            else {
              setLoading(false);
              callUpdateItemToast();
              navigation.replace("/items/" + item.id);
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
    [data, city, navigation, token, item, validate, setErrors, setLoading]
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
          ALTERE OS DADOS DO <b>ITEM</b>.
        </h1>
        <p>
          E ajude a comunidade do <b>FINT.IT</b> com transparência
        </p>
        <hr />
      </header>
      <main>
        <InputBanner
          error={errors["picture"]}
          value={banner}
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
          icon={PencilLine}
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
        <div>
          <Button disabled={loading} type="submit" theme="default-fill">
            Salvar
          </Button>
          <DialogTrigger asChild disabled={loading}>
            <Button disabled={loading} type="button">
              Apagar
            </Button>
          </DialogTrigger>
        </div>
        {loading && <p>Atualizando item . . .</p>}
      </footer>
    </form>
  );
}
