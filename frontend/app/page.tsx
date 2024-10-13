import Header from "@/components/header";
import Query from "@/components/query";
import SearchProvider from "@/context/search";

export default function Home() {
  return (
    <SearchProvider>
      <Header search login rank />
      <main>
        <Query />
      </main>
    </SearchProvider>
  );
}
