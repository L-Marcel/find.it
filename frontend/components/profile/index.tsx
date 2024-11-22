import Image from "next/image";
import { User } from "@phosphor-icons/react/dist/ssr";
import styles from "./index.module.scss";
import Link from "next/link";

interface ProfileProps {
  theme?: "default" | "green" | "pink";
  picture?: string;
  name?: string;
  id: string;
}

export default function Profile({
  id,
  name,
  theme = "default",
  picture,
}: ProfileProps) {
  return (
    <Link
      href={`/users/${id}`}
      className={`${styles.profile} ${theme !== "default" ? styles[theme] : ""}`}
    >
      {picture ? (
        <Image
          src={`${process.env.API_DOMAIN}/users/${picture}`}
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
