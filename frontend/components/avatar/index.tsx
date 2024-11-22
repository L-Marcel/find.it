import Image from "next/image";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import "./index.scss";

interface AvatarProps {
  big?: boolean;
  picture: string;
}

export default function Avatar({ big = false, picture}: AvatarProps) {
  const size = big ? 156 : 98;
  if (picture)
    return (
      <Image id="avatar" src={picture} alt="" width={size} height={size} />
    );
  return <UserCircle id="avatar" weight="thin" width={size} height={size} />;
}
