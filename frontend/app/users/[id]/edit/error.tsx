"use client";

import Button from "@/components/button";
import useNavigation from "@/context/navigation";
import Unauthorized from "@/errors/Unauthorized";

export default function Error({
  error,
  reset,
}: {
  error: Error & { cause?: string; digest?: string };
  reset: () => void;
}) {
  const navigation = useNavigation();
  let title = "Erro desconhecido!";

  switch (error.digest) {
    case "HTTP:401":
      title = "Acesso negado!";
      break;
    default:
      break;
  }

  return (
    <main className="error">
      <section>
        <h1>{title}</h1>
        <p>{error.message}</p>
      </section>
      <Button theme="default-fill" onClick={() => navigation.back()}>
        Voltar para a página anterior
      </Button>
    </main>
  );
}
