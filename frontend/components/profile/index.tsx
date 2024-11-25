import { User } from "@phosphor-icons/react/dist/ssr";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";

interface ProfileProps {
  theme?: "default" | "green" | "pink";
  picture?: string;
  updatedAt?: string;
  name?: string;
  id: string;
}

export default function Profile({
  id,
  name,
  theme = "default",
  picture,
  updatedAt,
}: ProfileProps) {
  return (
    <Link
      href={`/users/${id}`}
      className={`${styles.profile} ${theme !== "default" ? styles[theme] : ""}`}
    >
      {picture && updatedAt ? (
        <Image
          src={`${process.env.API_DOMAIN}/users/${picture}?v=${updatedAt.replace(/ /g, "_")}`}
          alt={name ?? picture}
          width={48}
          height={48}
        />
      ) : (
        <User width={24} height={24} />
      )}
      {name && <p>{name}</p>}
    </Link>
  );
}
