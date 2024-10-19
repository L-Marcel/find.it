import BackButton from "@/components/button/backButton";
import { getUser } from "@/context/user";
import { headers } from "next/headers";

export default async function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = headers().get("x-auth-id");
  const token = headers().get("x-auth-token");

  if (userId && token && id && id === userId) {
    const user = await getUser(id, token);
    if (user) {
      return (
        <>
          <header className="header">
            <section>
              <BackButton />
            </section>
          </header>
          <main>
            <p>Autenticado</p>
            <p>{user.name}</p>
            <p>
              {id} - {userId}
            </p>
            <p>{token}</p>
          </main>
        </>
      );
    }
  }

  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main>
        <p>Não autenticado</p>
        <p>
          {id} - {userId}
        </p>
        <p>{token}</p>
      </main>
    </>
  );
}
