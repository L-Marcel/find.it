import "./index.scss";
import Image from "next/image";
import logo from "@/images/logo.webp";
import BackButton from "@/components/button/backButton";
import { headers } from "next/headers";
import { getUser } from "@/context/user";
import CreateItemForm from "@/components/forms/items/create";
import Unauthorized from "@/errors/Unauthorized";
import SearchProvider from "@/context/search";

export default async function CreateItem({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = headers().get("x-auth-id");
  const token = headers().get("x-auth-token");
  if (userId !== id) throw new Unauthorized();
  const user = await getUser(id, token);

  //MARK: Implement the edit item page
  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main className="create">
        <section>
          <Image src={logo} alt="Fint.it" />
          <SearchProvider>
            <CreateItemForm />
          </SearchProvider>
        </section>
      </main>
    </>
  );
}
