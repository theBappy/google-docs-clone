'use client'

import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import { MenuItem } from "./menu-bar";
import { Doc } from "../../../../convex/_generated/dataModel";

interface NavbarProps{
  data: Doc<'documents'>;
}

export const Navbar = ({data}:NavbarProps) => {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image width={36} height={36} src="/logo.svg" alt="logo" />
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <MenuItem data={data} />
        </div>
      </div>
    </nav>
  );
};
