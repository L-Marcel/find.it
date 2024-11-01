import "./index.scss";
import React from "react";
import Image from "next/image";
import { User } from "@phosphor-icons/react/dist/ssr";
import { At, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  whatsapp: boolean;
  donated: number;
  recovered: number;
  finds: number;
  contact: string;
  phone?: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <li key={user.id} className="user-card">
      {user.picture ? (
        <Image
          src={`${process.env.API_DOMAIN}/users/${user.picture}`}
          alt={user.name ?? user.picture}
          width={156}
          height={156}
          style={{ borderRadius: "100px" }}
        />
      ) : (
        <User width={24} height={24} />
      )}
      <div className="user-column">
        <div className="user-column">
          <h1>SEU NOME É...</h1>
          <p>{user.name}</p>
        </div>
        <div className="user-row">
          {(user?.contact === "PHONE" || user?.contact === "BOTH") &&
            (user?.whatsapp ? (
              <div className="icon-bg">
                <WhatsappLogo size={28} />
              </div>
            ) : (
              <div className="icon-bg">
                <Phone size={28} />
              </div>
            ))}

          <div className="user-column">
            <h1>TELEFONE</h1>
            <p>{user.phone || "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="user-column">
        <div className="user-column">
          <h1>ENCONTRADOS / RECUPERADOS / DOADOS</h1>
          <p>
            {user.donated} / {user.recovered} / {user.finds}
          </p>
        </div>
        <div className="user-row">
          <div className="icon-bg">
            <At size={28} />
          </div>
          <div className="user-column">
            <h1>E-MAIL</h1>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
      {/*<p>Contact: {user.contact}</p>*/}
    </li>
  );
};

export default UserCard;
