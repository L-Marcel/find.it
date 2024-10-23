import { getUser } from "@/context/user";
import { headers } from "next/headers";
import Button from "../button";
import Profile from "../profile";
import LogoutButton from "../button/logout";

interface HeaderProfileProps {
  justIcon?: boolean;
}

export default async function HeaderProfile({
  justIcon = false,
}: HeaderProfileProps) {
  const _headers = await headers();
  const userId = _headers.get("x-auth-id");
  const token = _headers.get("x-auth-token");

  try {
    const user = await getUser(userId, token);
    return (
      <>
        <Profile
          id={user.id}
          name={!justIcon ? user.name : undefined}
          picture={user.picture}
        />
        <LogoutButton />
      </>
    );
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <Button className="register-button" to="/register">
        Cadastrar-se
      </Button>
      <Button to="/login" theme="default-fill">
        Entrar
      </Button>
    </>
  );
}
