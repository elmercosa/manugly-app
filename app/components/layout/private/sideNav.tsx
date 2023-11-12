"use client";
import { IconRobotFace } from "@tabler/icons-react";
import Link from "next/link";

import BecomePro from "@/components/layout/private/becomePro";
import Menu from "@/components/layout/private/menu";

export default function SideNav() {
  return (
    <div className="col-start-1 col-end-3 h-full transition-all">
      <div className="flex flex-col h-full bg-white rounded-xl">
        <div className="flex items-center justify-center h-28 min-h-[7rem]">
          <Link
            href="/"
            className="flex items-center justify-center text-4xl font-bold text-emerald-600 gap-1"
          >
            <IconRobotFace size={40} />
            <span className="tracking-tighter">Manugly</span>
          </Link>
        </div>
        <Menu />
        <div className="flex flex-col items-center justify-center gap-6 m-5">
          <BecomePro />
        </div>
      </div>
    </div>
  );
}
