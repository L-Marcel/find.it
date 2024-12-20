import { notFound } from "next/navigation";
import { User } from "./user";
import { z } from "zod";

//#region Schemas
export const itemSchema = z.object({
  picture: z.string().min(1, "Forneça uma imagem, mesmo que ilustrativa!"),
  title: z
    .string()
    .min(1, "É necessário informar um título!")
    .min(8, "Título pequeno demais!")
    .max(90, "Título muito grande!"),
  type: z.enum(["FIND", "LOST", "DONATION"]),
  description: z.optional(
    z
      .string()
      .min(12, "Descição muito pequena!")
      .max(360, "Descrição muito grande!")
  ),
  district: z.optional(z.string().max(200, "Limite de caracteres excedido!")),
  street: z.optional(z.string().max(200, "Limite de caracteres excedido!")),
  number: z.optional(
    z
      .string()
      .regex(/^\d+$/gm, "Utilize apenas números!")
      .max(200, "Limite de caracteres excedido!")
  ),
  complement: z.optional(z.string().max(200, "Limite de caracteres excedido!")),
});
//#endregion

export type CreateItemData = z.infer<typeof itemSchema>;

export type Item = {
  id: number;
  type: "FIND" | "LOST" | "DONATION";
  title: string;
  picture: string;
  description: string;
  city: string;
  state: string;
  street: string;
  district: string;
  number: number;
  complement: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    picture: string;
    contact: User["contact"];
    whatsapp: boolean;
    finds: number;
    donated: number;
    recovered: number;
    email: string;
    phone: string;
    updatedAt: string;
  };
};

export function typeToText(type: "FIND" | "LOST" | "DONATION") {
  switch (type) {
    case "FIND":
      return "Encontrado";
    case "LOST":
      return "Perdido";
    case "DONATION":
      return "Doação";
    default:
      return "Desconhecido";
  }
}

export async function getItem(id: string) {
  return await fetch(`${process.env.API_URL}/items/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    // cache: "default",
    // next: {
    //   tags: [`item-${id}`],
    // },
  }).then(async (res) => {
    if (res.ok) {
      return res.json() as Promise<Item>;
    } else {
      notFound();
    }
  });
}
