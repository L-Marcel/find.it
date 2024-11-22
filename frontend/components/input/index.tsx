"use client";

import type { Icon } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import styles from "./index.module.scss";
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
  disabled,
  ...props
}: InputProps) {
  const loading = useIsLoading();

  return (
    <label className={`${styles.input} ${error ? styles.error : ""}`}>
      <div>
        <Icon />
        <input
          disabled={loading || disabled}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {error && <p>{error}</p>}
    </label>
  );
}
