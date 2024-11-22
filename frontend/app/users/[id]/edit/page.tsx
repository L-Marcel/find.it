import styles from "./index.module.scss";
import BackButton from "@/components/button/back";
import { getPublicUser, getUser } from "@/context/user";
import Unauthorized from "@/errors/Unauthorized";
import { headers } from "next/headers";
import logo from "@/images/logo.webp";
import Image from "next/image";
import EditUserForm from "@/components/forms/user/edit";
import HeaderProfile from "@/components/header/profile";
import { Metadata } from "next";

interface EditUserProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditUserProps): Promise<Metadata> {
  const id = (await params).id;
  const user = await getPublicUser(id);

  return {
    title: user.name,
  };
}

export default async function EditUser({ params }: EditUserProps) {
  const id = (await params).id;
  const _headers = await headers();
  const userId = _headers.get("x-auth-id");
  const token = _headers.get("x-auth-token");

  if (userId !== id) throw new Unauthorized();
  const user = await getUser(id, token);

  return (
    <>
      <header className={styles.header}>
        <section id="desktop">
          <BackButton />
          <div>
            <HeaderProfile />
          </div>
        </section>
        <section id="mobile">
          <BackButton onlyIcon />
          <div>
            <HeaderProfile />
          </div>
        </section>
      </header>
      <main className={styles.edit}>
        <section className="sm:-mt-4 2xl:mt-4 mb-6">
          <Image src={logo} alt="Fint.it" />
          <EditUserForm token={token ?? ""} user={user} />
        </section>
      </main>
    </>
  );
}
