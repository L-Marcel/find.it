// Medal.tsx

import React from "react";

type MedalProps = {
  rank: number;
};

const Medal: React.FC<MedalProps> = ({ rank }) => {
  // Determine medal color and icon based on rank
  const getMedalStyles = () => {
    switch (rank) {
      case 0:
        return "bg-yellow-400 text-zinc-900";
      case 1:
        return "bg-zinc-500 text-zinc-900"; // Silver
      case 2:
        return "bg-yellow-700 text-zinc-900"; // Bronze
      default:
        return "bg-zinc-900 text-zinc-200"; // Black for other ranks
    }
  };

  return (
    <div className={`medal ${getMedalStyles()}`}>
      {rank + 1}
      {"º"}
    </div>
  );
};

export default Medal;
