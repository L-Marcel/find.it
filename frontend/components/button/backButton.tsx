"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Button from ".";

export default function BackButton() {
  //MARK: Prevent back to wrong pages (as the previous site)
  const router = useRouter();

  return (
    <Button onClick={router.back} icon={ArrowLeft}>
      Voltar
    </Button>
  );
}
