import "./index.scss";
import React from "react";

interface LabelProps {
  theme?: "default" | "small";
  header: string;
  children: string;
  icon?: React.ReactNode;
}

export default function Label({ theme, header, children, icon }: LabelProps) {
  return (
    <section className={`label ${theme ? theme : "default"}`}>
      {icon ? <span className="label-icon">{icon}</span> : null}
      <div className="label-content">
        <h1 className="header">{header}</h1>
        <p className="content">{children}</p>
      </div>
    </section>
  );
}
