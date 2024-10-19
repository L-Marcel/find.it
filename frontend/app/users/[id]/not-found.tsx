"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="error">
      <section>
        <h1>Usuário não encontrado!</h1>
        <p>
          Se estiver em dúvida quanto a essa informação, verifique sua conexão
          com a internet. Em última instância, entre em contato com nossa
          equipe!
        </p>
      </section>
      <Button theme="default-fill" onClick={router.back}>
        Voltar para a página anterior
      </Button>
    </main>
  );
}
