"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserCard from "@/components/userCard/index";
import Filter from "@/components/switch/filter";
import "./index.scss";

interface User {
  name: string;
  email: string;
  picture: string;
  whatsapp: boolean;
  contact: string;
  id: string;
  finds: number;
  recovered: number;
  donated: number;
}

const fetchUserRankings = async () => {
  const response = await fetch(`${process.env.API_URL}/users/rank`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const UserList: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userRankings"],
    queryFn: fetchUserRankings,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user-list">
      <div className="filter-container">
        <Filter />
      </div>
      <ul>
        {data.byDonateds.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
