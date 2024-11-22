"use client";

import { callTextCopiedToast } from "../ui/toasts";
import styles from "./index.module.scss";
import React, { ReactNode } from "react";

interface LabelProps {
  theme?: "default" | "small";
  header: string;
  children: ReactNode;
  icon?: React.ReactNode;
  id?: string;
  canCopy?: boolean;
}

export default function Label({
  theme,
  header,
  children,
  icon,
  id,
  canCopy = false,
}: LabelProps) {
  return (
    <div
      id={id}
      className={`${styles.label} ${theme === "small" ? styles.small : ""}`}
    >
      {icon && <span>{icon}</span>}
      <div>
        <h1>{header}</h1>
        <p
          className={canCopy ? styles.copiable : ""}
          onClick={() => {
            if (children && canCopy) {
              navigator.clipboard.writeText(children.toString());
              callTextCopiedToast();
            }
          }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
