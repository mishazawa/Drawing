import Link from "next/link";
import { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode | string;
};
export function ButtonLink({ href, children }: ButtonLinkProps) {
  return <Link href={href}>{children}</Link>;
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
      type="button"
      className={
        className +
        " inline-flex items-center px-4 py-2 text-sm font-medium bg-transparent border-blue-200 text-blue-200 focus:z-10 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      }
    >
      <div className="flex leading-5">{children}</div>
    </button>
  );
}
