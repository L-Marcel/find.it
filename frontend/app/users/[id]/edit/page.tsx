import "./index.scss";
import BackButton from "@/components/button/backButton";
import { getUser } from "@/context/user";
import Unauthorized from "@/errors/Unauthorized";
import { headers } from "next/headers";
import logo from "@/images/logo.webp";
import Image from "next/image";
import EditUserForm from "@/components/forms/user/edit";

export default async function EditUserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = headers().get("x-auth-id");
  const token = headers().get("x-auth-token");

  const user = await getUser(id, token);
  if (!user || userId !== id) throw new Unauthorized();

  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main className="edit">
        <section>
          <Image src={logo} alt="Fint.it" />
          <EditUserForm token={token ?? ""} id={id} user={user} />
        </section>
      </main>
    </>
  );
}
