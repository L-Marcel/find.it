"use client";

import type { Icon } from "@phosphor-icons/react";
import { Eraser, Pencil } from "@phosphor-icons/react/dist/ssr";
import styles from "./index.module.scss";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useIsLoading } from "@/context/loading";
import { callInvalidImageToast } from "../ui/toasts";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: Icon;
  canClear?: boolean;
  onFileLoaded: (base64: string, blob: Blob) => void;
  onFileClear: () => void;
  inputOnly?: boolean;
}

export default function File({
  icon: Icon = Pencil,
  canClear,
  inputOnly = false,
  onFileClear = () => {},
  onFileLoaded = () => {},
  ...props
}: InputProps) {
  const loading = useIsLoading();

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files !== null) {
      const reader = new FileReader();
      const file = (e.currentTarget.files as FileList)[0];
      if (
        file.type.startsWith("image/png") ||
        file.type.startsWith("image/jpeg")
      ) {
        reader.onload = () =>
          onFileLoaded(reader.result?.toString() ?? "", file);
        reader.readAsDataURL(e.currentTarget.files[0]);
      } else {
        callInvalidImageToast();
      }
    } else {
      onFileLoaded("", new Blob());
    }
  }

  if (inputOnly)
    return (
      <input
        type="file"
        tabIndex={-1}
        disabled={loading}
        accept="image/jpeg, image/png"
        onChange={onChange}
        {...props}
      />
    );

  return (
    <div className={styles.fileInputs}>
      {canClear && (
        <button
          type="button"
          disabled={loading}
          className={styles.input}
          onClick={onFileClear}
        >
          <Eraser />
        </button>
      )}
      <label className={`${styles.input} ${styles.fileInput}`}>
        <div>
          <Icon />
          <input
            type="file"
            tabIndex={0}
            disabled={loading}
            accept="image/jpeg, image/png"
            onChange={onChange}
            {...props}
          />
          <p>Alterar avatar</p>
        </div>
      </label>
    </div>
  );
}
