"use client";

import styles from "./index.module.scss";
import { CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface SwitchProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  theme?: "default" | "pink" | "green";
  children: string;
  onClick: () => void;
}

export default function Switch({
  theme = "default",
  checked = false,
  onClick = () => {},
  disabled,
  children,
  ...props
}: SwitchProps) {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`${styles.switch} ${styles[theme]} ${checked ? styles.fill : ""}`}
      onClick={onClick}
    >
      <input
        checked={checked}
        onChange={onClick}
        disabled={disabled}
        type="checkbox"
        {...props}
      />
      {checked ? (
        <CheckCircle />
      ) : (
        <Circle />
      )}
      <span>{children}</span> {}
    </button>
  );
}
