"use client";

import Button from "@/components/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <p>Error: {error.message}</p>
      <Button onClick={reset}>Tentar novamente</Button>
    </main>
  );
}
