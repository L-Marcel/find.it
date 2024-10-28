"use client";

import Switch from ".";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

interface TypeSwitchProps {
  type: "FIND" | "LOST" | "DONATION";
  onChange: (type: "FIND" | "LOST" | "DONATION") => void;
}

export default function TypeSwitch({ type, onChange }: TypeSwitchProps) {
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div tabIndex={-1} ref={ref} className="filter" {...events}>
      <Switch checked={type === "FIND"} onClick={() => onChange("FIND")}>
        Achei
      </Switch>
      <Switch
        theme="pink"
        checked={type === "LOST"}
        onClick={() => onChange("LOST")}
      >
        Perdi
      </Switch>
      <Switch
        theme="green"
        checked={type === "DONATION"}
        onClick={() => onChange("DONATION")}
      >
        Quero doar
      </Switch>
    </div>
  );
}
