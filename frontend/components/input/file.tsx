import type { Icon } from "@phosphor-icons/react";
import { Pencil } from "@phosphor-icons/react/dist/ssr";
import "./index.scss";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: Icon;
  onFileLoaded: (base64: string, blob: Blob) => void;
}

export default function File({
  icon: Icon = Pencil,
  accept = "image/png, image/jpeg",
  placeholder = "Avatar",
  onFileLoaded = () => {},
  ...props
}: InputProps) {
  return (
    <label className="input">
      <div tabIndex={0}>
        <Icon />
        <input
          type="file"
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
  );
}
