import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";

import "./index.scss";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export interface SelectorProps {
  onChange: (index: number) => void;
  options: string[];
  selected: number;
}

export function Selector({ onChange, options, selected }: SelectorProps) {
  const container = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  const virtuals = virtualizer.getVirtualItems();

  return (
    <div className="selector">
      <Button
        onClick={() => {
          if (container.current)
            container.current.scrollTo(0, 48 * Math.max(0, selected - 1));
        }}
        right
        theme="default"
        icon={CaretDown}
      >
        {options[selected]}
      </Button>
      <div
        ref={container}
        className="options"
        style={{
          height: 860,
          width: 200,
        }}
      >
        <div
          ref={ref}
          style={{
            minHeight: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {virtuals.map((virtual) => (
            <span
              key={virtual.index}
              className={virtual.index === selected ? "selected" : ""}
              tabIndex={0}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 48,
                transform: `translateY(${virtual.start}px)`,
              }}
              onClick={() => onChange(virtual.index)}
            >
              {options[virtual.index]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
