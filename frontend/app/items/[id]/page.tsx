import BackButton from "@/components/button/backButton";
import { getItem } from "@/context/items";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const item = await getItem(id);

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
