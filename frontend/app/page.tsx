import Header from "@/components/header";
import SearchProvider from "@/context/search";

export default function Home() {
  return (
    <SearchProvider>
      <Header search login rank />
      <main></main>
    </SearchProvider>
  );
}
