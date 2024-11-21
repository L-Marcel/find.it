import "./index.scss";
import Image from "next/image";
import logo from "@/images/logo.webp";
import BackButton from "@/components/button/back";
import RegisterUserForm from "@/components/forms/user/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find.it - Cadastro",
  description: "Crie sua conta agora mesmo!",
};

export default function Register() {
  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main className="register">
        <section className="sm:-mt-8 2xl:mt-4 mb-2">
          <Image src={logo} alt="Fint.it" />
          <RegisterUserForm />
        </section>
      </main>
    </>
  );
}
