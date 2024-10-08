import type { Icon } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import "./index.scss";
import {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import Link from "next/link";

type ButtonOrLinkProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export interface ButtonProps extends ButtonOrLinkProps {
  icon?: Icon;
  theme?: "default" | "default-fill" | "pink-fill" | "green-fill" | "red";
  to?: string;
}

export default function Button({
  theme = "default",
  icon: Icon,
  children,
  to,
  ...props
}: ButtonProps) {
  if (to) {
    return (
      <Link
        href={to}
        className={`button ${theme} ${Icon ? "icon" : ""}`}
        {...props}
      >
        {Icon && <Icon />}
        {children && <span>{children}</span>}
      </Link>
    );
  }

  return (
    <button className={`button ${theme} ${Icon ? "icon" : ""}`} {...props}>
      {Icon && <Icon />}
      {children && <span>{children}</span>}
    </button>
  );
}
