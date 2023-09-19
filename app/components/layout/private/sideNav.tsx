"use client";
import Link from "next/link";

import BecomePro from "@/components/layout/private/becomePro";
import Menu from "@/components/layout/private/menu";

export default function SideNav() {
  return (
    <div className="w-[15%] max-w-[15%] h-screen transition-all flex flex-col border-r-[1px] border-gray-100 bg-white">
      <div className="flex items-center justify-center border-b-[1px] m-5">
        <Link
          href="/"
          className="flex items-center pl-4 m-5 text-4xl font-bold text-emerald-600"
        >
          Manugly
        </Link>
      </div>
      <Menu />
      <div className="flex flex-col items-center justify-center gap-6 m-5">
        <BecomePro />
      </div>
    </div>
  );
}
