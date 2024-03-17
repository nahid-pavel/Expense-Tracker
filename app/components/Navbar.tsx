import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between  items-center mx-auto bg-slate-800 py-2 px-2 max-width-">
      <Link href="/" className="text-white font-bold">
        Home
      </Link>
      <Link href="/addItem" className=" bg-white px-4 font-bold">
        Create
      </Link>
    </nav>
  );
}
