"use client";

import { Toaster as Sonner } from "sonner";
import styles from "./index.module.scss";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className={styles.toaster}
      toastOptions={{
        classNames: {
          icon: styles.icon,
          toast: styles.body,
          description: styles.description,
          actionButton: styles.action,
          cancelButton: styles.cancel,
          closeButton: styles.close,
          title: styles.title,
          content: styles.content,
          success: styles.success,
          warning: styles.warning,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
