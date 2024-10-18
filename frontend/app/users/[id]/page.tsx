import Header from "@/components/header";
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
          <Header back />
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
      <Header back />
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
