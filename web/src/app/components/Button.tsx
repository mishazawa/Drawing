import Link from "next/link";
import { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode | string;
};
export function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className="inline-block px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
    >
      {children}
    </Link>
  );
}

type ButtonControlsProps = {
  onClick?: () => void;
  className?: string;
  children: ReactNode | string;
};
export function ButtonControls({
  onClick,
  className = "",
  children,
}: ButtonControlsProps) {
  return (
    <button
      onClick={onClick}
      className={
        className +
        " text-base focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-700 hover:text-teal-100 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition"
      }
    >
      <div className="flex leading-5">{children}</div>
    </button>
  );
}
