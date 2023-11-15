"use client";
import { IconRobotFace } from "@tabler/icons-react";
import Link from "next/link";

import BusinessWrapper from "@/components/business/businessWrapper";
import BusinessSelect from "@/components/business/select/businessSelect";
import BecomePro from "@/components/layout/private/becomePro";
import Menu from "@/components/layout/private/menu";

export default function SideNav() {
  return (
    <BusinessWrapper>
      <div className="h-full col-start-1 col-end-3 transition-all">
        <div className="flex flex-col h-full bg-white rounded-xl">
          <div className="flex items-center justify-center h-28 min-h-[7rem]">
            <Link
              href="/"
              className="flex items-center justify-center gap-1 text-4xl font-bold text-emerald-600"
            >
              <IconRobotFace size={40} />
              <span className="tracking-tighter">Manugly</span>
            </Link>
          </div>
          <BusinessSelect></BusinessSelect>
          <Menu />
          <div className="flex flex-col items-center justify-center gap-6 m-5">
            <BecomePro />
          </div>
        </div>
      </div>
    </BusinessWrapper>
  );
}
