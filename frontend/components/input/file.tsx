"use client";

import type { Icon } from "@phosphor-icons/react";
import { Eraser, Pencil } from "@phosphor-icons/react/dist/ssr";
import "./index.scss";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useIsLoading } from "@/context/loading";

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
      if (file.type.startsWith("image/")) {
        reader.onload = () =>
          onFileLoaded(reader.result?.toString() ?? "", file);
        reader.readAsDataURL(e.currentTarget.files[0]);
      } else {
        //MARK: Put dialog here
      }
    } else {
      onFileLoaded("", new Blob());
    }
  }

  if (inputOnly)
    return (
      <input
        type="file"
        disabled={loading}
        accept="image/*"
        onChange={onChange}
        {...props}
      />
    );

  return (
    <div className="file-inputs">
      {canClear && (
        <button
          type="button"
          disabled={loading}
          className="input"
          onClick={onFileClear}
        >
          <Eraser />
        </button>
      )}
      <label className="input file-input">
        <div>
          <Icon />
          <input
            type="file"
            tabIndex={0}
            disabled={loading}
            accept="image/*"
            onChange={onChange}
            {...props}
          />
          <p>Alterar avatar</p>
        </div>
      </label>
    </div>
  );
}
