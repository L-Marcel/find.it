import "./index.scss";
import React from "react";

interface LabelProps {
  theme?: "default" | "small";
  header: string;
  children: string;
  icon?: React.ReactNode;
  id?: string;
}

export default function Label({
  theme,
  header,
  children,
  icon,
  id,
}: LabelProps) {
  return (
    <div id={id} className={`label ${theme ? theme : "default"}`}>
      {icon && <span>{icon}</span>}
      <div>
        <h1>{header}</h1>
        <p>{children}</p>
      </div>
    </div>
  );
}
