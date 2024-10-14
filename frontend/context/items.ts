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
