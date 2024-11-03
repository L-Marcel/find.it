import "./index.scss";
import Image from "next/image";
import logo from "@/images/logo.webp";
import LoginForm from "@/components/forms/login";
import BackButton from "@/components/button/back";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find.it - Login",
  description: "Entre com sua conta agora mesmo!",
};

interface LoginProps {
  searchParams: Promise<{ redirect: string }>;
}

export default async function Login({ searchParams }: LoginProps) {
  const redirect = (await searchParams).redirect;

  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main className="login">
        <section className="sm:-mt-8 2xl:mt-4 mb-2">
          <Image src={logo} alt="Fint.it" />
          <LoginForm redirect={redirect} />
        </section>
      </main>
    </>
  );
}
