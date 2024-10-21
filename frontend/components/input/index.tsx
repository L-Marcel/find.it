"use client";

import type { Icon } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import "./index.scss";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useIsLoading } from "@/context/loading";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: Icon;
  error?: string;
}

export default function Input({
  icon: Icon = MagnifyingGlass,
  error = "",
  placeholder = "Buscar por . . .",
  ...props
}: InputProps) {
  const loading = useIsLoading();

  return (
    <label className={`input ${error ? "error" : ""}`}>
      <div>
        <Icon />
        <input disabled={loading} placeholder={placeholder} {...props} />
      </div>
      {error && <p>{error}</p>}
    </label>
  );
}
