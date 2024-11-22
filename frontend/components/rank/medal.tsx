import React from "react";

type MedalProps = {
  rank: number;
};

const Medal: React.FC<MedalProps> = ({ rank }) => {
  const getMedalStyles = () => {
    switch (rank) {
      case 0:
        return "bg-yellow-400 text-zinc-900";
      case 1:
        return "bg-zinc-500 text-zinc-900";
      case 2:
        return "bg-yellow-700 text-zinc-900";
    }
  };

  return (
    <div className={`rank-medal ${getMedalStyles()}`}>
      {rank + 1}º
    </div>
  );
};

export default Medal;
