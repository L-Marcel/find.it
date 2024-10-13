import { useVirtualizer } from "@tanstack/react-virtual";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";

export default function Masonry({ rows }: { rows: Array<number> }) {
  const mansory = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const [ref, setRef] = useState<HTMLElement | null>(null);

  const gap = 30;
  const minItemWidth = 300;
  const mansoryWidth = mansory.current?.clientWidth || width || 1366;
  const columns = Math.max(Math.floor(mansoryWidth / (minItemWidth + gap)), 1);
  const columnWidth = (mansoryWidth - (columns - 1) * gap) / columns;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => ref,
    estimateSize: () => minItemWidth,
    overscan: 5,
    lanes: columns,
    gap: gap,
  });

  useEffect(() => {
    const element = document.getElementById("page");
    if (element) setRef(element);
  }, [setRef]);

  useEffect(() => {
    rowVirtualizer.measure();
  }, [columns]);

  return (
    <div
      className="masonry"
      ref={mansory}
      style={{
        height: rowVirtualizer.getTotalSize(),
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => (
        <div
          key={virtualRow.index}
          className="item"
          style={{
            position: "absolute",
            top: 0,
            left: virtualRow.lane * (columnWidth + gap),
            width: columnWidth,
            height: 300,
            transform: `translateY(${virtualRow.start}px)`,
          }}
        >
          <p>{virtualRow.index}</p>
        </div>
      ))}
    </div>
  );
}
