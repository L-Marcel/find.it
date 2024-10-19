import "./index.scss";
import Image from "next/image";
import logo from "@/images/logo.webp";
import LoginForm from "@/components/forms/login";
import BackButton from "@/components/button/backButton";

export default function Login() {
  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main className="login">
        <section>
          <Image src={logo} alt="Fint.it" />
          <LoginForm />
        </section>
      </main>
    </>
  );
}
