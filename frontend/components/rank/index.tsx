import "./index.scss";
import React from "react";
import Image from "next/image";
import { User } from "@phosphor-icons/react/dist/ssr";
import { At, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Medal from "./medal";
import { PublicUser } from "@/context/user";
import Avatar from "../avatar";
import Label from "../label";

interface UserCardProps {
  user: PublicUser;
  index: number;
}

export default function RankCard({ user, index }: UserCardProps) {
  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const getMedalStyles = () => {
    switch (index) {
      case 0:
        return "after:bg-yellow-400";
      case 1:
        return "after:bg-zinc-500";
      case 2:
        return "after:bg-yellow-700";
    }
  };

  
  return (
    <li key={user.id} className="rank-card">
      <div>
        <span style={{
          '--after-content': `'${index+1}º'`,
         } as any} className={`rank-medal ${getMedalStyles()}`}>
          <Avatar
            picture={`${process.env.API_DOMAIN}/users/${user.picture}`}
            big
          />
        </span>
        <Label header="SEU NOME É...">{user.name}</Label>
      </div>
      <hr />
      <div>
        <Label header="SEU NOME É...">{user.name}</Label>
        <Label id="stats" header="ACHADO / PERDIDO / DOADO">
          {`${user.finds} / ${user.recovered} / ${user.donated}`}
        </Label>
        {user.phone && (
          <Label
            icon={
              user.whatsapp ? (
                <WhatsappLogo width={24} height={24} />
              ) : (
                <Phone width={24} height={24} />
              )
            }
            header="TELEFONE"
          >
            {user.phone}
          </Label>
        )}
        {user.email && (
          <Label icon={<At width={24} height={24} />} header="EMAIL">
            {user.email}
          </Label>
        )}
      </div>
    </li>
  );
}
