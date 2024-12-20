"use client";

import Switch from ".";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import styles from "./index.module.scss";

interface TypeSwitchProps {
  type: "FIND" | "LOST" | "DONATION";
  onChange: (type: "FIND" | "LOST" | "DONATION") => void;
  alternative?: boolean;
  center?: boolean;
}

export default function TypeSwitch({
  type,
  onChange,
  center = false,
  alternative = false,
}: TypeSwitchProps) {
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div
      tabIndex={-1}
      ref={ref}
      className={`${styles.filter} ${center ? styles.alternative : ""}`}
      {...events}
    >
      <Switch checked={type === "FIND"} onClick={() => onChange("FIND")}>
        {alternative ? "Achados" : "Achei"}
      </Switch>
      <Switch
        theme="pink"
        checked={type === "LOST"}
        onClick={() => onChange("LOST")}
      >
        {alternative ? "Perdidos" : "Perdi"}
      </Switch>
      <Switch
        theme="green"
        checked={type === "DONATION"}
        onClick={() => onChange("DONATION")}
      >
        {alternative ? "Doações" : "Quero doar"}
      </Switch>
    </div>
  );
}
