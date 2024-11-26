"use client";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import BusinessWrapper from "@/components/business/businessWrapper";
import BusinessSelect from "@/components/business/select/businessSelect";
import BecomePro from "@/components/layout/private/becomePro";
import Menu from "@/components/layout/private/menu";

export default function SideNav() {
  return (
    <BusinessWrapper>
      <div className={`h-full transition-all w-2/12`}>
        <div className="flex flex-col h-full bg-white dark:bg-content1 rounded-xl">
          <div className="flex items-center justify-center h-28 min-h-[7rem]">
            <Link
              href="/"
              className="flex items-center justify-center gap-1 text-3xl font-bold"
            >
              <Image src="/manugly.svg" alt="Manugly" width="40" height="40" />

              <span className="tracking-tighter">Manugly</span>
            </Link>
          </div>
          <Menu />
          <BusinessSelect />
        </div>
      </div>
    </BusinessWrapper>
  );
}
