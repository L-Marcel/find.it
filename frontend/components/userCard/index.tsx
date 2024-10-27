import "./index.scss";
import React from "react";
import Image from "next/image";
import { User } from "@phosphor-icons/react/dist/ssr";

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
  phone?: string; // Optional if not all users have this
}

interface UserCardProps {
  user: User; // Expecting a user object
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <li key={user.id} className="user-card">
      {user.picture ? (
        <Image
          src={`${process.env.API_DOMAIN}/users/${user.picture}`}
          alt={user.name ?? user.picture}
          width={48}
          height={48}
        />
      ) : (
        <User width={24} height={24} />
      )}
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone || "N/A"}</p> {/* Display phone if available */}
      <p>Donated: {user.donated}</p>
      <p>Recovered: {user.recovered}</p>
      <p>Finds: {user.finds}</p>
      <p>Contact: {user.contact}</p>
    </li>
  );
};

export default UserCard;
