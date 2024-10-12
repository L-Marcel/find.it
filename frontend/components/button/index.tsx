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
  right?: boolean;
}

export default function Button({
  theme = "default",
  icon: Icon,
  children,
  to,
  right = false,
  ...props
}: ButtonProps) {
  const className = `button ${theme} ${Icon ? "icon" : ""} ${right ? "right" : ""}`;
  const content = (
    <>
      {Icon && !right && <Icon />}
      {children && <span>{children}</span>}
      {Icon && right && <Icon />}
    </>
  );

  if (to) {
    return (
      <Link href={to} className={className} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} {...props}>
      {content}
    </button>
  );
}
