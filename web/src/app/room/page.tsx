"use client";

import { useSearchParams } from "next/navigation";
import { Viewer } from "./Viewer";
import { Shower } from "./Shower";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Room />
    </Suspense>
  );
}

function Room() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (id) return <Viewer id={id} />;
  return <Shower />;
}
