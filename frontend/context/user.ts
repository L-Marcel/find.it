import { z } from "zod";
import { useContextSelector } from "use-context-selector";
import { context } from "./provider";

//#region Schemas
export const userSchema = z
  .object({
    name: z
      .string()
      .min(1, "É necessário informar um nome!")
      .min(8, "Nome pequeno demais!")
      .max(90, "Nome muito grande!"),
    email: z
      .string()
      .min(1, "É necessário informar um e-mail!")
      .email("Formato inválido de e-mail!")
      .max(80, "E-mail grande demais!"),
    phone: z
      .string()
      .min(1, "É necessário informar um telefone!")
      .regex(/^\d+$/gm, "Utilize apenas números!")
      .regex(/^(\d{2}[9]?\d{8}|\d{10})$/g, "Telefone inválido!"),
    password: z
      .string()
      .min(1, "É necessário informar uma senha!")
      .max(24, "Senha grande demais!")
      .min(8, "Senha pequena demais!"),
    passwordConfirmation: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    { message: "Senhas não coincidem!", path: ["passwordConfirmation"] }
  );
//#endregion

export type User = z.infer<typeof userSchema>;

export default function useUser() {
  return useContextSelector(context, (context) => context.user);
}