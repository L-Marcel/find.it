"use client";

import { Toaster as Sonner } from "sonner";
import "./index.scss";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster"
      toastOptions={{
        classNames: {
          icon: "toast-icon",
          toast: "toast-body",
          description: "toast-description",
          actionButton: "toast-action",
          cancelButton: "toast-cancel",
          closeButton: "toast-close",
          title: "toast-title",
          content: "toast-content",
          success: "toast-success",
          warning: "toast-warning",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
