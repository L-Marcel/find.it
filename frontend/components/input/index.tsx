import type { Icon } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import "./index.scss";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

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
  return (
    <label className={`input ${error ? "error" : ""}`}>
      <div>
        <Icon />
        <input placeholder={placeholder} {...props} />
      </div>
      {error && <p>{error}</p>}
    </label>
  );
}
