import type { Icon } from "@phosphor-icons/react";
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
  right?: boolean;
}

export default function Button({
  theme = "default",
  icon: Icon,
  children,
  to,
  right = false,
  className = "",
  ...props
}: ButtonProps) {
  const _className = `${className} button ${theme} ${Icon ? "icon" : ""} ${right ? "right" : ""}`;

  if (to) {
    return (
      <Link
        aria-disabled={props.disabled}
        tabIndex={0}
        href={to}
        className={_className}
        {...props}
      >
        {Icon && !right && <Icon />}
        {children && <span>{children}</span>}
        {Icon && right && <Icon />}
      </Link>
    );
  }

  return (
    <button className={_className} {...props}>
      {Icon && !right && <Icon />}
      {children && <span>{children}</span>}
      {Icon && right && <Icon />}
    </button>
  );
}
