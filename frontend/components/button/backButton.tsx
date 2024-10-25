"use client";

import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Button from ".";
import useNavigation from "@/context/navigation";
import { useIsLoading } from "@/context/loading";

interface BackButtonProps {
  alternative?: string;
}

export default function BackButton({ alternative }: BackButtonProps) {
  const loading = useIsLoading();
  const navigation = useNavigation();

  return (
    <Button
      disabled={loading}
      onClick={() => navigation.back(alternative)}
      icon={ArrowLeft}
    >
      Voltar
    </Button>
  );
}
