import Image from "next/image";
import Button from "../button";
import { User } from "@phosphor-icons/react/dist/ssr";
import "./index.scss";
import Link from "next/link";

interface ProfileProps {
  theme?: "default" | "green" | "pink";
  picture: string;
  name: string;
  id: string;
}

export default function Profile({ id, name, theme, picture }: ProfileProps) {
  return (
    <Link href={`/users/${id}`} className={`profile ${theme}`}>
      {picture ? (
        <Image src={picture} alt={name} width={48} height={48} />
      ) : (
        <User width={24} height={24} />
      )}
      <p>{name}</p>
    </Link>
  );
}
