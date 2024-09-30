"use client";

import type { Icon } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import "./index.scss";
import {
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import { useWindowSize } from "@uidotdev/usehooks";

export interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  icon?: Icon;
  error?: string;
}

export default function Textarea({
  icon: Icon = MagnifyingGlass,
  error = "",
  maxLength = 360,
  placeholder = "Buscar por . . .",
  onChange = () => {},
  onResize = () => {},
  ...props
}: TextareaProps) {
  const ref = useRef<HTMLLabelElement>(null);
  let { width, height } = useWindowSize();

  useEffect(() => {
    if (ref) {
      let textarea = ref.current?.getElementsByTagName("textarea")[0];
      resize(textarea);
    }
  }, [width, height]);

  function resize(textarea?: HTMLTextAreaElement) {
    if (!textarea) return;
    textarea.style.height = "5px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  return (
    <label ref={ref} className={`input ${error ? "error" : ""}`}>
      <div>
        <Icon />
        <textarea
          maxLength={maxLength}
          onResize={(e) => {
            resize(e.currentTarget);
            onResize && onResize(e);
          }}
          onChange={(e) => {
            resize(e.currentTarget);
            onChange && onChange(e);
          }}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {error && <p>{error}</p>}
    </label>
  );
}
