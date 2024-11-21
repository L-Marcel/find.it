import "./index.scss";
import Image from "next/image";
import logo from "@/images/logo.webp";
import BackButton from "@/components/button/back";
import { headers } from "next/headers";
import { getUser } from "@/context/user";
import CreateItemForm from "@/components/forms/items/create";
import Unauthorized from "@/errors/Unauthorized";
import SearchProvider from "@/context/search";
import HeaderProfile from "@/components/header/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find.it - Registrar um item",
  description: "Perdeu alguma coisa? Por que está esperando para registrar?",
};

export default async function CreateItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const _headers = await headers();
  const userId = _headers.get("x-auth-id");
  const token = _headers.get("x-auth-token");
  if (userId !== id || !token) throw new Unauthorized();
  const user = await getUser(id, token);

  return (
    <>
      <header className="header">
        <section id="desktop">
          <BackButton />
          <div>
            <HeaderProfile />
          </div>
        </section>
        <section id="mobile">
          <BackButton onlyIcon />
          <div>
            <HeaderProfile />
          </div>
        </section>
      </header>
      <main className="create">
        <section className="sm:-mt-4 2xl:mt-4 mb-6">
          <Image src={logo} alt="Fint.it" />
          <SearchProvider>
            <CreateItemForm token={token} user={user} />
          </SearchProvider>
        </section>
      </main>
    </>
  );
}
