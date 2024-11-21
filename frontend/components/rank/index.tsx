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
  return (
    <div key={user.id} className="rank-card">
      <Avatar
        picture={`${process.env.API_DOMAIN}/users/${user.picture}`}
      />
      <Label header={user.name}>{user.finds}/{user.recovered}/{user.donated}</Label>
    </div>
  );
}
