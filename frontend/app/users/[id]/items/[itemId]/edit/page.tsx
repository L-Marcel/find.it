import BackButton from "@/components/button/back";
import EditItemForm from "@/components/forms/items/edit";
import { getItem } from "@/context/items";
import { getUser } from "@/context/user";
import Unauthorized from "@/errors/Unauthorized";
import { headers } from "next/headers";
import Image from "next/image";
import logo from "@/images/logo.webp";
import "./index.scss";
import RemoveItemDialog from "@/components/dialogues/item/remove";
import SearchProvider from "@/context/search";
import HeaderProfile from "@/components/header/profile";

export default async function EditItem({
  params,
}: {
  params: Promise<{ id: string; itemId: string }>;
}) {
  const _params = await params;
  const id = _params.id;
  const itemId = _params.itemId;
  const _headers = await headers();
  const userId = _headers.get("x-auth-id");
  const token = _headers.get("x-auth-token");
  if (userId !== id || !token) throw new Unauthorized();
  const user = await getUser(id, token);
  const item = await getItem(itemId);
  if (item.user.id !== user.id) throw new Unauthorized();

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
      <main className="edit">
        <section className="sm:-mt-4 2xl:mt-4 mb-6">
          <Image src={logo} alt="Fint.it" />
          <SearchProvider>
            <RemoveItemDialog token={token} item={item}>
              <EditItemForm token={token} item={item} />
            </RemoveItemDialog>
          </SearchProvider>
        </section>
      </main>
    </>
  );
}
