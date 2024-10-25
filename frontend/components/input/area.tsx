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
import { useIsLoading } from "@/context/loading";

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
  const loading = useIsLoading();
  const ref = useRef<HTMLLabelElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (ref) {
      const textarea = ref.current?.getElementsByTagName("textarea")[0];
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
          disabled={loading}
          maxLength={maxLength}
          onResize={(e) => {
            resize(e.currentTarget);
            onResize(e);
          }}
          onChange={(e) => {
            resize(e.currentTarget);
            onChange(e);
          }}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {error && <p>{error}</p>}
    </label>
  );
}
