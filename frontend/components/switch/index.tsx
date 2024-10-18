"use client";

import "./index.scss";
import { CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";

export interface SwitchProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  theme?: "default" | "default-fill" | "pink-fill" | "green-fill";
  children: string;
  onClick: () => void;
}

export default function Switch({
  theme = "default-fill",
  checked = false,
  onClick = () => {},
  disabled,
  children,
  ...props
}: SwitchProps) {
  return (
    <button
      disabled={disabled}
      className={`switch ${checked ? theme : "default"} ${disabled ? "disabled" : ""}`}
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
        <CheckCircle className="custom-icon" />
      ) : (
        <Circle className="custom-icon" />
      )}
      <span>{children}</span> {}
    </button>
  );
}
