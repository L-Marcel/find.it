"use client";

import "../index.scss";
import {
  At,
  City,
  ClipboardText,
  Hash,
  SolarRoof,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import Button from "../../button";
import Input from "../../input";
import { FormEvent, useCallback, useEffect, useState } from "react";
import File from "../../input/file";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useLoading from "@/context/loading";
import { CreateItemData, itemSchema as createSchema } from "@/context/items";
import Textarea from "@/components/input/area";
import CitySelector from "@/components/header/citySelector";

const initial: CreateItemData = {
  cityAndState: "Natal - RN",
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

export default function CreateItemForm() {
  //#region States
  const { push } = useRouter();
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
    const result = createSchema.safeParse(data);
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
        //setLoading(true);
        // fetch(`${process.env.API_URL}/users`, {
        //   method: "POST",
        //   headers: {
        //     "Content-type": "application/json",
        //   },
        //   body: JSON.stringify(data),
        // })
        //   .then(async (response) => {
        //     if (!response.ok) throw await response.json();
        //     setLoading(false);
        //     push("/login");
        //   })
        //   .catch((error) => {
        //     setLoading(false);
        //     setErrors({
        //       new: true,
        //       ...error.fields,
        //     });
        //   });
      }
    },
    [push, data, validate, setErrors, setLoading]
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
  const Banner = () =>
    banner ? (
      <Image width={98} height={98} alt="avatar" src={banner} />
    ) : (
      <UserCircle width={98} height={98} />
    );

  const InputFile = () => (
    <File
      name="picture"
      canClear={!!banner}
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
  );
  //#endregion

  return (
    <form className="form" onSubmit={submit}>
      <header>
        <h1>
          <b>ENCONTROU</b>, <b>PERDEU</b> OU QUER <p>DOAR</p> ALGO?
        </h1>
        <p>
          Cadastre um novo <b>ITEM</b>
        </p>
        <hr />
      </header>
      <main>
        <Banner />
        <InputFile />
        <div>
          <Input
            name="title"
            value={data.title}
            onChange={(e) => update("title", e.currentTarget.value)}
            error={errors["title"]}
            icon={ClipboardText}
            placeholder="Título"
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
          <CitySelector />
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
          Adicionar
        </Button>
        {loading && <p>Adicionando novo item . . .</p>}
      </footer>
    </form>
  );
}
