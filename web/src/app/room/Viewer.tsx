"use client";

import { ButtonLink } from "@/app/components/Button";
import { LeftArrow } from "@/app/components/Icons";
import { Base64Slide } from "@/app/components/Slide";
import { useFirestore } from "@/app/hooks/useFirestore";
import { useEffect, useState } from "react";
import { doc, onSnapshot, Bytes } from "firebase/firestore";

export function Viewer({ id }: { id: string }) {
  const [src, setSrc] = useState("");
  const data = useFirestoreSnapshot<{ image: Bytes | null; head: string }>(id);

  useEffect(() => {
    if (!data || !data.image) return;
    setSrc(`${data.head},${data.image.toBase64()}`);
  }, [data]);

  return (
    <>
      <div className="p-6 flex flex-col items-stretch bg-grey-lighter min-h-screen">
        <div className="fixed z-10">
          <ButtonLink href="/">
            <LeftArrow />
          </ButtonLink>
        </div>
        <Base64Slide src={src} />
      </div>
    </>
  );
}

function useFirestoreSnapshot<T>(id: string) {
  const firestore = useFirestore();
  const [data, set] = useState<T>();
  useEffect(() => {
    const unsub = onSnapshot(doc(firestore, "sharing", id), (doc) => {
      set(doc.data() as T);
    });
    return unsub;
  }, []);

  return data;
}
