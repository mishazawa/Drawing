import Link from "next/link";
import { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode | string;
};
export function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <div className="p-6">
      <Link
        href={href}
        className="inline-block px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        {children}
      </Link>
    </div>
  );
}
