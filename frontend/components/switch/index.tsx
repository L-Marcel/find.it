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
}

export default function Switch({
  theme = "default-fill",
  checked = false,
  onChange = () => {},
  children,
  ...props
}: SwitchProps) {
  return (
    <label className="switch-body">
      <input
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="switch-input"
        {...props}
      />
      <div className={`switch ${checked ? theme : "default"}`}>
        {checked ? (
          <CheckCircle className="custom-icon" />
        ) : (
          <Circle className="custom-icon" />
        )}
        <span>{children}</span> {}
      </div>
    </label>
  );
}
