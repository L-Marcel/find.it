"use client";

import { useState } from "react";
import "./index.scss";
import { UsersRank } from "@/context/user";
import TypeSwitch from "../switch/type";
import RankCard from ".";

interface RankListProps {
  ranks: UsersRank;
}

export default function RankList({ ranks }: RankListProps) {
  const [type, setType] = useState<"FIND" | "LOST" | "DONATION">("FIND");

  const users = type === "FIND" ? ranks.byFinds : type === "LOST" ? ranks.byRecovereds : ranks.byDonateds;

  return (
    <>
      <div className="filters">
        <TypeSwitch
          type={type}
          onChange={(type) => setType(type)}
          alternative
          center
        />
      </div>
      <div className="rank-list">
        {users.map((user, index) => (
          <RankCard user={user} key={user.id} index={index} />
        ))}
      </div>
    </>
  );
};
