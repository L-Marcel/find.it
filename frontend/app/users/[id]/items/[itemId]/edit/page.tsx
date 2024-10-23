import BackButton from "@/components/button/backButton";
import { getItem } from "@/context/items";
import { getUser } from "@/context/user";
import Unauthorized from "@/errors/Unauthorized";
import { headers } from "next/headers";

export default async function EditItem({
  params: { id, itemId },
}: {
  params: { id: string; itemId: string };
}) {
  const userId = headers().get("x-auth-id");
  const token = headers().get("x-auth-token");
  if (userId !== id) throw new Unauthorized();
  const user = await getUser(id, token);
  const item = await getItem(itemId);

  //MARK: Implement the edit item page
  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main>
        <p>
          {item.state} - {item.city} - {item.title}
        </p>
      </main>
    </>
  );
}
