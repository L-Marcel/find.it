import "./index.scss";
import Image from "next/image";
import logo from "@/images/logo.webp";
import RegisterForm from "@/components/forms/register";
import BackButton from "@/components/button/backButton";

export default function Register() {
  return (
    <>
      <header className="header">
        <section>
          <BackButton alternative="/login" />
        </section>
      </header>
      <main className="register">
        <section>
          <Image src={logo} alt="Fint.it" />
          <RegisterForm />
        </section>
      </main>
    </>
  );
}
