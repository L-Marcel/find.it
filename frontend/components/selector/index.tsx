"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";

import styles from "./index.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { defaultRangeExtractor, useVirtualizer } from "@tanstack/react-virtual";

export interface SelectorProps {
  onChange: (index: number) => void;
  options: string[];
  selected: number;
  small?: boolean;
}

export function Selector({
  onChange,
  options,
  selected,
  small,
}: SelectorProps) {
  const selector = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [above, setAbove] = useState(true);

  //#region Virtualization
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
  //#endregion
  //#region Positioning
  const onScroll = useCallback(
    (e: Event) => {
      if (e.target && small) {
        const element = e.target as HTMLElement;
        const bottom = selector.current?.getBoundingClientRect().bottom ?? 0;

        setAbove(bottom + 300 < element.clientHeight);
      }
    },
    [setAbove, small]
  );

  useEffect(() => {
    document.body.addEventListener("scroll", onScroll);
    return () => {
      document.body.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
  //#endregion

  return (
    <div className={styles.selector} ref={selector}>
      <Button
        onFocus={moveToSelected}
        onClick={moveToSelected}
        right
        theme="default"
        type="button"
        icon={CaretDown}
      >
        {options[selected]}
      </Button>
      <div
        ref={container}
        tabIndex={-1}
        className={`${styles.options} ${above ? "" : styles.bellow}`}
        style={{
          height: 860,
          maxHeight: small ? "calc(216px + 3rem)" : "80vh",
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
              className={virtual.index === selected ? styles.selected : ""}
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
                try {
                  if (document.activeElement)
                    (document.activeElement as HTMLElement).blur();
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (_) {}
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
                  try {
                    if (document.activeElement)
                      (document.activeElement as HTMLElement).blur();
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  } catch (_) {}
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
