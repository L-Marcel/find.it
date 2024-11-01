import "./index.scss";
import BackButton from "@/components/button/backButton";
import SearchProvider from "@/context/search";
import UserList from "@/components/userCard/userList";

export default function Rank() {
  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main className="main-container">
        <h3>Ranqueamento</h3>
        <section>
          <SearchProvider>
            <UserList />
          </SearchProvider>
        </section>
      </main>
    </>
  );
}
