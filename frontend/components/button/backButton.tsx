"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Button from ".";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={router.back} icon={ArrowLeft}>
      Voltar
    </Button>
  );
}
