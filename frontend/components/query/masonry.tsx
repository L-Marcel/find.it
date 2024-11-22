import { Item } from "@/context/items";
import { defaultRangeExtractor, useVirtualizer } from "@tanstack/react-virtual";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import MasonryItem from "./item";
import styles from "./index.module.scss";

interface MasonryProps {
  items: Item[];
  fetching: boolean;
  onEnd: () => void;
}

export default function Masonry({ items, fetching, onEnd }: MasonryProps) {
  const [alreadyEnded, setAlreadyEnded] = useState<boolean>(false);
  const masonry = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const gap = 30;
  const minItemWidth = 360;
  const itemHeight = 320;
  const masonryWidth = masonry.current?.clientWidth || width || 1366;
  const columns = Math.max(Math.floor(masonryWidth / (minItemWidth + gap)), 1);
  const columnWidth = (masonryWidth - (columns - 1) * gap) / columns;
  const count = items.length;

  const virtualizer = useVirtualizer({
    count,
    estimateSize: () => itemHeight,
    overscan: columns * columns,
    lanes: columns,
    gap: gap,
    getScrollElement: () => document?.body,
    rangeExtractor: (range) => {
      const ranges = defaultRangeExtractor(range);
      if (!ranges.includes(count - 1)) {
        ranges.push(count - 1);
      }

      return ranges;
    },
  });

  const virtuals = virtualizer.getVirtualItems();

  const ended = virtuals.some(
    (virtual) => items.length - 2 === virtual.index && !fetching
  );

  useEffect(() => {
    virtualizer.measure();
  }, [virtualizer, columns]);

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
      className={styles.masonry}
      id="masonry"
      ref={masonry}
      style={{
        height: virtualizer.getTotalSize(),
      }}
    >
      {virtuals.length === 0 && <h4>Nenhum item foi encontrado!</h4>}
      {virtuals.map((virtual) => {
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
