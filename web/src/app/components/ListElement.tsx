import { ReactNode } from "react";

type ListElementProps = {
  checked: boolean;
  id: string;
  onChange: () => void;
  children?: ReactNode | string;
};
export function ListElement({
  id,
  checked,
  onChange,
  children,
}: ListElementProps) {
  return (
    <li>
      <input
        type="radio"
        id={id}
        name="hosting"
        className="hidden peer"
        onChange={onChange}
        checked={checked}
        required
      />
      <label
        htmlFor={id}
        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="block">
          <div className="w-full text-lg font-semibold">{id}</div>
          {children}
        </div>
      </label>
    </li>
  );
}
