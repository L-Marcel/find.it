import "./index.scss";
import Image from "next/image";
import logo from "@/images/logo.webp";
import BackButton from "@/components/button/back";
import RegisterUserForm from "@/components/forms/user/register";

export default function Register() {
  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main className="register">
        <section>
          <Image src={logo} alt="Fint.it" />
          <RegisterUserForm />
        </section>
      </main>
    </>
  );
}
