import { Item, typeToText } from "@/context/items";
import { VirtualItem } from "@tanstack/react-virtual";
import Button from "../button";
import Image from "next/image";

interface MasonryItemProps {
  item?: Item;
  virtual: VirtualItem;
  width: number;
  height: number;
  gap: number;
}

export default function MasonryItem({
  item,
  virtual,
  width,
  height,
  gap,
}: MasonryItemProps) {
  let child = <p>{virtual.index}</p>;
  let theme = "";
  let buttonTheme: "default-fill" | "pink-fill" | "green-fill" = "default-fill";

  if (item) {
    switch (item.type) {
      case "FIND":
        break;
      case "LOST":
        theme = "pink";
        buttonTheme = "pink-fill";
        break;
      case "DONATION":
        theme = "green";
        buttonTheme = "green-fill";
        break;
    }

    child = (
      <>
        <header>
          <span>{typeToText(item.type)}</span>
          {item.picture && (
            <Image
              width={width}
              height={140}
              src={item.picture}
              alt={item.title}
            />
          )}
        </header>
        <main>
          <h2>{item.title}</h2>
          <p>Av. Amintas Barros, 3300 - Lagoa Nova, Natal - RN, 59075-250</p>
        </main>
        <footer>
          <Button theme={buttonTheme}>Verificar</Button>
        </footer>
      </>
    );
  }

  return (
    <article
      className={`item ${item ? "default" : "loading"} ${theme}`}
      style={{
        position: "absolute",
        top: 0,
        left: virtual.lane * (width + gap),
        width: width,
        height,
        transform: `translateY(${virtual.start}px)`,
      }}
    >
      {child}
    </article>
  );
}
