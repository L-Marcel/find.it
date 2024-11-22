import { getUser } from "@/context/user";
import { headers } from "next/headers";
import Button from "../button";
import Profile from "../profile";
import LogoutButton from "../button/logout";
import { Pencil } from "@phosphor-icons/react/dist/ssr";

interface HeaderProfileProps {
  justIcon?: boolean;
  edit?: boolean;
}

export default async function HeaderProfile({
  justIcon = false,
  edit = false,
}: HeaderProfileProps) {
  const _headers = await headers();
  const userId = _headers.get("x-auth-id");
  const token = _headers.get("x-auth-token");

  try {
    const user = await getUser(userId, token);
    return (
      <>
        {edit ? (
          <Button icon={Pencil} to={`/users/${user.id}/edit`}>
            Editar
          </Button>
        ) : (
          <Profile
            id={user.id}
            name={!justIcon ? user.name : undefined}
            picture={user.picture}
          />
        )}
        <LogoutButton />
      </>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {}

  return (
    <>
      <Button id="register-button" to="/register">
        Cadastrar-se
      </Button>
      <Button to="/login" theme="default-fill">
        Entrar
      </Button>
    </>
  );
}
