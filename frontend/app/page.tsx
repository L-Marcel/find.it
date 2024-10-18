import Header from "@/components/header";
import Loading from "@/components/loading";
import Query from "@/components/query";
import SearchProvider from "@/context/search";

export default function Home() {
  return (
    <SearchProvider>
      <Loading />
      <Header search profile rank />
      <main>
        <Query />
      </main>
    </SearchProvider>
  );
}
