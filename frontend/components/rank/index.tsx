import styles from "./index.module.scss";
import React from "react";
import { At, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { PublicUser } from "@/context/user";
import Avatar from "../avatar";
import Label from "../label";
import { formatPhone } from "@/lib/utils";
import Link from "next/link";

interface UserCardProps {
  user: PublicUser;
  index: number;
}

export default function RankCard({ user, index }: UserCardProps) {
  const getMedalStyles = () => {
    switch (index) {
      case 0:
        return "after:bg-yellow-400";
      case 1:
        return "after:bg-zinc-500";
      case 2:
        return "after:bg-yellow-700";
      default:
        return "after:bg-zinc-900 after:text-zinc-200";
    }
  };

  return (
    <li key={user.id} className={styles.card}>
      <div>
        <Link
          href={`/users/${user.id}`}
          style={
            /* eslint-disable @typescript-eslint/no-explicit-any */
            {
              "--after-content": `'${index + 1}º'`,
            } as any
          }
          className={`${styles.medal} ${getMedalStyles()}`}
        >
          <Avatar
            picture={`${process.env.API_DOMAIN}/users/${user.picture}?v=${user.updatedAt.replace(/ /g, "_")}`}
            big
          />
        </Link>
        <Label canCopy header="SEU NOME É...">
          {user.name}
        </Label>
      </div>
      <hr />
      <div>
        <Label canCopy header="SEU NOME É...">
          {user.name}
        </Label>
        <Label id="stats" header="ACHADO / PERDIDO / DOADO">
          {`${user.finds} / ${user.recovered} / ${user.donated}`}
        </Label>
        {user.phone && (
          <Label
            canCopy
            icon={
              user.whatsapp ? (
                <WhatsappLogo width={24} height={24} />
              ) : (
                <Phone width={24} height={24} />
              )
            }
            header="TELEFONE"
          >
            {formatPhone(user.phone)}
          </Label>
        )}
        {user.email && (
          <Label canCopy icon={<At width={24} height={24} />} header="EMAIL">
            {user.email}
          </Label>
        )}
      </div>
    </li>
  );
}
