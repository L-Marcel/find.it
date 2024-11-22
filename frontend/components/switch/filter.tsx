"use client";

import useFilters from "@/context/filters";
import Switch from ".";
import { useCallback, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import styles from "./index.module.scss";

export default function Filter() {
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const { setFilters, finds, losts, donateds } = useFilters();

  const switchFinds = useCallback(() => {
    setFilters((filters) => ({ ...filters, finds: !filters.finds }));
  }, [setFilters]);

  const switchLosts = useCallback(() => {
    setFilters((filters) => ({ ...filters, losts: !filters.losts }));
  }, [setFilters]);

  const switchDonateds = useCallback(() => {
    setFilters((filters) => ({ ...filters, donateds: !filters.donateds }));
  }, [setFilters]);

  return (
    <div tabIndex={-1} ref={ref} className={styles.filter} {...events}>
      <Switch checked={finds} onClick={() => switchFinds()}>
        Achados
      </Switch>
      <Switch theme="pink" checked={losts} onClick={() => switchLosts()}>
        Perdidos
      </Switch>
      <Switch theme="green" checked={donateds} onClick={() => switchDonateds()}>
        Doações
      </Switch>
    </div>
  );
}
