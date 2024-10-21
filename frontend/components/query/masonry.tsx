import { Item } from "@/context/items";
import { defaultRangeExtractor, useVirtualizer } from "@tanstack/react-virtual";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import MasonryItem from "./item";

interface MasonryProps {
  items: Item[];
  fetching: boolean;
  onEnd: () => void;
}

export default function Masonry({ items, fetching, onEnd }: MasonryProps) {
  const [alreadyEnded, setAlreadyEnded] = useState<boolean>(false);
  const mansory = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const [ref, setRef] = useState<HTMLElement | null>(null);

  const gap = 30;
  const minItemWidth = 360;
  const itemHeight = 320;
  const mansoryWidth = mansory.current?.clientWidth || width || 1366;
  const columns = Math.max(Math.floor(mansoryWidth / (minItemWidth + gap)), 1);
  const columnWidth = (mansoryWidth - (columns - 1) * gap) / columns;
  const count = items.length + (fetching ? 10 : 0);

  const virtualizer = useVirtualizer({
    count,
    estimateSize: () => itemHeight,
    overscan: columns * columns,
    lanes: columns,
    gap: gap,
    getScrollElement: () => ref,
    rangeExtractor: (range) => {
      const ranges = defaultRangeExtractor(range);
      if (!ranges.includes(count - 1)) {
        ranges.push(count - 1);
      }

      return ranges;
    },
  });

  const virtuals = virtualizer.getVirtualItems();

  //MARK: Button to load more items
  const ended = virtuals.some(
    (virtual) => items.length - 2 === virtual.index && !fetching
  );

  useEffect(() => {
    const element = document.getElementById("page");
    if (element) setRef(element);
  }, [setRef]);

  useEffect(() => {
    virtualizer.measure();
  }, [columns]);

  useEffect(() => {
    if (!alreadyEnded && ended) {
      setAlreadyEnded(true);
      onEnd();
    } else if (alreadyEnded && !ended) {
      setAlreadyEnded(false);
    }
  }, [ended, alreadyEnded, onEnd, setAlreadyEnded]);

  return (
    <div
      className="masonry"
      ref={mansory}
      style={{
        height: virtualizer.getTotalSize(),
      }}
    >
      {virtuals.map((virtual) => {
        if (fetching && virtual.index >= items.length) {
          return (
            <MasonryItem
              key={virtual.index}
              virtual={virtual}
              width={columnWidth}
              height={itemHeight}
              gap={gap}
            />
          );
        }

        const item = items[virtual.index];

        return (
          <MasonryItem
            key={`${virtual.index} - ${item.id}`}
            item={item}
            virtual={virtual}
            width={columnWidth}
            height={itemHeight}
            gap={gap}
          />
        );
      })}
    </div>
  );
}
