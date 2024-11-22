import Image from "next/image";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import styles from "./index.module.scss";

interface AvatarProps {
  big?: boolean;
  picture: string;
}

export default function Avatar({ big = false, picture }: AvatarProps) {
  const size = big ? 156 : 98;
  if (picture)
    return (
      <Image id="avatar" className={styles.avatar} src={picture} alt="" width={size} height={size} />
    );
  return <UserCircle id="avatar" className={styles.avatar} weight="thin" width={size} height={size} />;
}
