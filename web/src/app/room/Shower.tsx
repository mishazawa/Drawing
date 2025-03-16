import { useDataStore } from "@/store/providers/data";
import { compressImage } from "@/utils/misc";
import { Timer } from "@/app/components/Timer";
import { Firestore, Bytes, doc, setDoc } from "firebase/firestore";
import { ButtonLink } from "@/app/components/Button";
import { Controls } from "@/app/components/ControlsHandler";
import { EventScreenHandler } from "@/app/components/EventScreenHandler";
import { LeftArrow } from "@/app/components/Icons";
import { Slide } from "@/app/components/Slide";
import { ProgressBar } from "@/app/components/Timer";
import { useFirestore } from "@/app/hooks/useFirestore";

export function Shower() {
  const syncImage = useFirestoreSync();
  return (
    <>
      <div className="p-6 flex flex-col items-stretch bg-grey-lighter min-h-screen">
        <div className="fixed z-10">
          <ButtonLink href="/">
            <LeftArrow />
          </ButtonLink>
        </div>
        <div className="fixed right-5 z-10">
          <Timer />
        </div>

        <Slide syncImage={syncImage} />

        <div className="fixed bottom-5 left-0 right-0">
          <Controls />
        </div>
        <div className="fixed bottom-0 left-0 right-0 -mb-4">
          <ProgressBar />
        </div>
      </div>
      <EventScreenHandler />
    </>
  );
}
function useFirestoreSync() {
  const sessionId = useDataStore((s) => s.sessionId);
  const firestore = useFirestore();

  async function syncImage(base: string) {
    if (!sessionId) return console.log("No session id.");
    if (!base) return console.log("No image");

    const img = await compressImage(base, 0.15);
    await storeImage(img, firestore, sessionId);
  }

  return syncImage;
}

async function storeImage(img: string, db: Firestore, id: string) {
  const [head, body] = img.split(",");
  const fsBytes = Bytes.fromBase64String(body);
  const ref = doc(db, "sharing", id);

  try {
    await setDoc(
      ref,
      {
        head,
        image: fsBytes,
      },
      { merge: true }
    );
  } catch (e) {
    console.log("Sync ERR:", e);
  }
}
