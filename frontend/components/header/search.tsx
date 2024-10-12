import "./index.scss";
import CitySelector from "./citySelector";
import Query from "./query";

export default function Search() {
  return (
    <div className="search">
      <CitySelector />
      <Query />
    </div>
  );
}
