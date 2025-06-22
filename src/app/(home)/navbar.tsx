import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";

export const Navbar = () => {
  return <nav className="flex items-center justify-between h-full w-full">
    <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
        <Image width={36} height={36} src="/logo.svg" alt="log" />
        </Link>
        <h3 className="text-xl">Docs</h3>
    </div>
    <SearchInput />
    <div />
  </nav>;
};
