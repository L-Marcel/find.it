import { notFound } from "next/navigation";
import { User } from "./user";

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
