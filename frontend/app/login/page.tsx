import "./index.scss";
import Image from "next/image";
import logo from "@/images/logo.webp";
import LoginForm from "@/components/forms/login";

export default function Login() {
  return (
    <main className="login">
      <section>
        <Image src={logo} alt="Fint.it" />
        <LoginForm />
      </section>
    </main>
  );
}
