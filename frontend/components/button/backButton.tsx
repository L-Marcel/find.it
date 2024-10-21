"use client";

import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Button from ".";
import useNavigation from "@/context/navigation";

interface BackButtonProps {
  alternative?: string;
}

export default function BackButton({ alternative }: BackButtonProps) {
  const navigation = useNavigation();

  return (
    <Button onClick={() => navigation.back(alternative)} icon={ArrowLeft}>
      Voltar
    </Button>
  );
}
