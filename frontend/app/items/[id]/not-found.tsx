"use client";

import Button from "@/components/button";
import useNavigation from "@/context/navigation";

export default function Error() {
  const navigation = useNavigation();

  return (
    <main className="error">
      <section>
        <h1>Item não encontrado!</h1>
        <p>
          Se estiver em dúvida quanto a essa informação, verifique sua conexão
          com a internet. Em última instância, entre em contato com nossa
          equipe!
        </p>
      </section>
      <Button theme="default-fill" onClick={() => navigation.back()}>
        Voltar para a página anterior
      </Button>
    </main>
  );
}
