"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserCard from "@/components/userCard/index";
import Filter from "@/components/switch/filter";
import useFilters from "@/context/filters";
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

  const { finds, losts, donateds } = useFilters();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredUsers = data.byDonateds
    .filter((user: User) => {
      const matchesFinds = finds ? user.finds > 0 : true;
      const matchesLosts = losts ? user.recovered > 0 : true;
      const matchesDonateds = donateds ? user.donated > 0 : true;
      return matchesFinds && matchesLosts && matchesDonateds;
    })
    .sort((a: User, b: User) => {
      if (losts) {
        return b.recovered - a.recovered;
      }
      if (finds) {
        return b.finds - a.finds;
      }
      if (donateds) {
        return b.donated - a.donated;
      }
      return 0;
    });

  return (
    <div className="user-list">
      <div className="filter-container">
        <Filter />
      </div>
      <ul>
        {filteredUsers.map((user: User, index: number) => (
          <UserCard key={user.id} user={user} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
