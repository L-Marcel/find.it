import "./index.scss";
import Image from "next/image";
import logo from "@/images/logo.webp";
import LoginForm from "@/components/forms/login";
import Header from "@/components/header";

export default function Login() {
  return (
    <>
      <Header back="/" />
      <main className="login">
        <section>
          <Image src={logo} alt="Fint.it" />
          <LoginForm />
        </section>
      </main>
    </>
  );
}
