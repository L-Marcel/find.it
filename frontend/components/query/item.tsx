import { Item, typeToText } from "@/context/items";
import { VirtualItem } from "@tanstack/react-virtual";
import Button from "../button";
import Profile from "../profile";
import {
  At,
  MapPinArea,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { bannerSize } from "../input/sizes";
import styles from "./index.module.scss";
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
  let child = (
    <>
      <header>
        <span id="tag">
          <span id="value" />
        </span>
        <span id="profile">
          <span id="avatar" />
          <span id="name" />
        </span>
      </header>
      <main>
        <span id="title" />
        <span id="location" />
      </main>
      <footer>
        <span id="button" />
        <span />
        <span />
        <span />
      </footer>
    </>
  );

  let theme: "default" | "pink" | "green" = "default";
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
              unoptimized
              width={width}
              height={bannerSize.height}
              src={`${process.env.API_DOMAIN}/items/${item.picture}?v=${item.updatedAt.replace(/ /g, "_")}`}
              alt={item.title}
            />
          )}
          <Profile
            id={item.user?.id}
            name={item.user?.name}
            picture={item.user?.picture}
            theme={theme}
            updatedAt={item.user?.updatedAt}
          />
        </header>
        <main>
          <h2>{item.title}</h2>
          <p>
            {[
              item.street,
              item.number,
              item.complement,
              item.district,
              `${item.city} - ${item.state}`,
            ]
              .filter((value) => value)
              .join(", ")}
          </p>
        </main>
        <footer>
          <Button to={`/items/${item.id}`} theme={buttonTheme}>
            Verificar
          </Button>
          {(item.user?.contact === "PHONE" || item.user?.contact === "BOTH") &&
            (item.user?.whatsapp ? <WhatsappLogo /> : <Phone />)}
          {(item.user?.contact === "EMAIL" ||
            item.user?.contact === "BOTH") && <At />}
          {item.street && <MapPinArea />}
        </footer>
      </>
    );
  }

  return (
    <article
      className={`${styles.item} ${item ? styles.default : styles.loading} ${styles[theme]}`}
      style={{
        position: "absolute",
        top: 0,
        left: virtual.lane * (width + gap),
        width,
        height,
        transform: `translateY(${virtual.start}px)`,
      }}
    >
      {child}
    </article>
  );
}
