import "./index.scss";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: "default" | "default-fill" | "pink-fill" | "green-fill" | "red";
}

export default function Button({ theme = "default", ...props }: ButtonProps) {
  return <button className={`button ${theme}`} {...props} />;
}
