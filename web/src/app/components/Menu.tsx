import { ValuesClassMode } from "./ValuesClassMode";
import { ValuesTimeMode } from "./ValuesTimeMode";
import { InputFolder } from "./InputFolder";
import { StartButton } from "./StartButton";
import { ToggleShuffle } from "./ToggleShuffle";

export function Menu() {
  return (
    <div className="flex flex-col gap-y-5">
      <ValuesTimeMode />
      <ValuesClassMode />
      <ToggleShuffle />
      <InputFolder />
      <StartButton />
    </div>
  );
}
