import { ValuesClassMode } from "./ValuesClassMode";
import { ValuesTimeMode } from "./ValuesTimeMode";
import { InputFolder } from "./InputFolder";
import { StartButton } from "./StartButton";
import { ToggleShuffle } from "./ToggleShuffle";
import { ToggleMode } from "./ToggleMode";

export function Menu() {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between">
        <ToggleMode />
        <StartButton />
      </div>
      <ValuesTimeMode />
      <ValuesClassMode />
      <ToggleShuffle />
      <InputFolder />
    </div>
  );
}
