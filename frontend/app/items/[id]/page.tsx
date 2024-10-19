import BackButton from "@/components/button/backButton";
import { getItem } from "@/context/items";

export default async function ItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const item = await getItem(id);

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
