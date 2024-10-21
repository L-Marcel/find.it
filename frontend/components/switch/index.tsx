"use client";

import "./index.scss";
import { CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";

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
      className={`switch ${theme} ${checked ? "fill" : ""} ${disabled ? "disabled" : ""}`}
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
