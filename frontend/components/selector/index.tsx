import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";
import { List } from "react-virtualized";

import "./index.scss";

export interface SelectorProps {
  onChange: (value: string) => void;
  options: string[];
  selected: string;
}

export function Selector({ onChange, options, selected }: SelectorProps) {
  return (
    <div className="selector">
      <Button right theme="default" icon={CaretDown}>
        {selected}
      </Button>
      <List
        className="options"
        width={200}
        style={{
          width: "100%",
          position: "absolute",
        }}
        autoWidth={true}
        height={860}
        rowHeight={48}
        rowCount={options.length}
        rowRenderer={({ key, index, style }) => (
          <span
            key={key}
            style={style}
            onClick={() => onChange(options[index])}
          >
            {options[index]}
          </span>
        )}
        overscanRowCount={5}
      />
    </div>
  );
}
