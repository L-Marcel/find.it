"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";

import "./index.scss";
import { useRef } from "react";
import { defaultRangeExtractor, useVirtualizer } from "@tanstack/react-virtual";

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
    lanes: 1,
    getScrollElement: () => ref.current,
    estimateSize: () => 48,
    rangeExtractor: (range) => {
      const ranges = defaultRangeExtractor(range);
      if (!ranges.includes(options.length - 1)) {
        ranges.push(options.length - 1);
      }

      return ranges;
    },
    overscan: 5,
  });

  const virtuals = virtualizer.getVirtualItems();

  function moveToSelected() {
    if (container.current) {
      virtualizer.scrollToIndex(Math.max(0, selected - 1), {
        align: "start",
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="selector">
      <Button
        id="selector-options"
        onFocus={moveToSelected}
        onClick={moveToSelected}
        right
        theme="default"
        icon={CaretDown}
      >
        {options[selected]}
      </Button>
      <div
        ref={container}
        tabIndex={-1}
        id="selector-options"
        className="options"
        style={{
          height: 860,
        }}
      >
        <div
          ref={ref}
          tabIndex={-1}
          style={{
            height: virtualizer.getTotalSize(),
          }}
        >
          {virtuals.map((virtual) => (
            <span
              key={virtual.index}
              id={"selector-option-" + virtual.index}
              className={virtual.index === selected ? "selected" : ""}
              tabIndex={virtual.index === selected ? 0 : -1}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 48,
                transform: `translateY(${virtual.start}px)`,
              }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.preventDefault();
                onChange(virtual.index);
                if (container.current) container.current.focus();
              }}
              onKeyDown={(e) => {
                if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
                  e.preventDefault();
                  document
                    .getElementById("selector-option-" + (virtual.index - 1))
                    ?.focus();
                } else if (e.code === "ArrowDown" || e.code === "ArrowRight") {
                  e.preventDefault();
                  document
                    .getElementById("selector-option-" + (virtual.index + 1))
                    ?.focus();
                } else if (e.code === "Enter") {
                  onChange(virtual.index);
                  if (container.current) container.current.focus();
                }
              }}
              onFocus={() => {
                virtualizer.scrollToIndex(Math.max(0, virtual.index - 1), {
                  align: "start",
                });
              }}
            >
              {options[virtual.index]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
