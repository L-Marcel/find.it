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

  if (inputOnly)
    return (
      <input
        type="file"
        disabled={loading}
        onChange={async (e) => {
          if (e.currentTarget.files !== null) {
            const reader = new FileReader();
            const file = (e.currentTarget.files as FileList)[0];
            reader.onload = () =>
              onFileLoaded(reader.result?.toString() ?? "", file);
            reader.readAsDataURL(e.currentTarget.files[0]);
          } else {
            onFileLoaded("", new Blob());
          }
        }}
        {...props}
      />
    );

  return (
    <div className="file-inputs">
      {canClear && (
        <button disabled={loading} className="input" onClick={onFileClear}>
          <Eraser />
        </button>
      )}
      <label className="input">
        <div>
          <Icon />
          <input
            type="file"
            tabIndex={0}
            disabled={loading}
            onChange={async (e) => {
              if (e.currentTarget.files !== null) {
                const reader = new FileReader();
                const file = (e.currentTarget.files as FileList)[0];
                reader.onload = () =>
                  onFileLoaded(reader.result?.toString() ?? "", file);
                reader.readAsDataURL(e.currentTarget.files[0]);
              } else {
                onFileLoaded("", new Blob());
              }
            }}
            {...props}
          />
          <p>Alterar avatar</p>
        </div>
      </label>
    </div>
  );
}
