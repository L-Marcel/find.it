import { notFound } from "next/navigation";
import { User } from "./user";
import { z } from "zod";

//#region Schemas
export const itemSchema = z.object({
  picture: z.string().optional(),
  title: z
    .string()
    .min(1, "É necessário informar um título!")
    .min(8, "Título pequeno demais!")
    .max(90, "Título muito grande!"),
  type: z.enum(["FIND", "LOST", "DONATION"]),
  description: z.optional(
    z
      .string()
      .min(8, "Descição muito pequena!")
      .max(300, "Descrição muito grande!")
  ),
  cityAndState: z.string(),
  district: z.string().optional(),
  street: z.string().optional(),
  number: z.string().regex(/^\d+$/gm, "Utilize apenas números!").optional(),
  complement: z.string().optional(),
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
  user: {
    id: string;
    name: string;
    picture: string;
    contact: User["contact"];
    whatsapp: boolean;
    email: string;
    phone: string;
  };
};

export function typeToText(type: "FIND" | "LOST" | "DONATION") {
  switch (type) {
    case "FIND":
      return "Achado";
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
  }).then(async (res) => {
    if (res.ok) {
      return res.json() as Promise<Item>;
    } else {
      notFound();
    }
  });
}
