"use client"

import "./index.scss";
import { CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";

export interface SwitchProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  theme?: "default" |"default-fill" | "pink-fill" | "green-fill" | "disabled";
  label: string;
}

export default function Switch({ theme = "default",
  label,
  ...props
}: SwitchProps) {

  const [isChecked, setIsChecked] = useState(false);

  return (
    <label className="switch-body">
      <input
        type="checkbox"
        className="switch-input"
        onChange={() => setIsChecked(!isChecked)}
        checked={isChecked}
        {...props}
      />
      <div className={`switch ${isChecked? theme : "default"}`}>
        {isChecked ? <CheckCircle className="custom-icon" /> : <Circle className="custom-icon" />}
        <span>{label}</span> {}
      </div>
    </label>
  );
}