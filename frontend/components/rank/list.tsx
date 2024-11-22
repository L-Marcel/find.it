"use client";

import { useState } from "react";
import styles from "./index.module.scss";
import { UsersRank } from "@/context/user";
import TypeSwitch from "../switch/type";
import RankCard from ".";

interface RankListProps {
  ranks: UsersRank;
}

export default function RankList({ ranks }: RankListProps) {
  const [type, setType] = useState<"FIND" | "LOST" | "DONATION">("FIND");

  const users =
    type === "FIND"
      ? ranks.byFinds
      : type === "LOST"
        ? ranks.byRecovereds
        : ranks.byDonateds;

  return (
    <>
      <div className={styles.filters}>
        <TypeSwitch
          type={type}
          onChange={(type) => setType(type)}
          alternative
          center
        />
      </div>
      <ul className={styles.list}>
        {users.map((user, index) => (
          <RankCard user={user} key={user.id} index={index} />
        ))}
      </ul>
    </>
  );
}
