import { getUser } from "@/context/user";
import { headers } from "next/headers";
import Button from "../button";
import Profile from "../profile";

export default async function HeaderProfile() {
  const userId = headers().get("x-auth-id");
  const token = headers().get("x-auth-token");
  const user = await getUser(userId, token, false);

  if (user)
    return <Profile id={user.id} name={user.name} picture={user.picture} />;
  return (
    <div className="login">
      <Button to="/register">Cadastrar-se</Button>
      <Button to="/login" theme="default-fill">
        Entrar
      </Button>
    </div>
  );
}
