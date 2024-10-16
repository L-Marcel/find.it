import { getItem } from "@/context/items";

export default async function ItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const item = await getItem(id);

  return (
    <main>
      <p>
        {item.state} - {item.city} - {item.title}
      </p>
    </main>
  );
}
