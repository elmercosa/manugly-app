"use client";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import BusinessWrapper from "@/components/business/businessWrapper";
import BusinessSelect from "@/components/business/select/businessSelect";
import BecomePro from "@/components/layout/private/becomePro";
import Menu from "@/components/layout/private/menu";

export default function SideNav({ mini }: { mini?: boolean }) {
  return (
    <BusinessWrapper>
      <div className={`h-full transition-all ${mini ? "w-12" : "w-[12vw]"}`}>
        <div className="flex flex-col h-full bg-white rounded-xl">
          <div className="flex items-center justify-center h-28 min-h-[7rem]">
            {mini ? (
              <Tooltip content="Manugly" placement="right" showArrow>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-1 text-4xl font-bold"
                >
                  <Image
                    src="/manugly.svg"
                    alt="Manugly"
                    width="48"
                    height="48"
                  />
                </Link>
              </Tooltip>
            ) : (
              <Link
                href="/"
                className="flex items-center justify-center gap-1 text-3xl font-bold"
              >
                <Image
                  src="/manugly.svg"
                  alt="Manugly"
                  width="40"
                  height="40"
                />

                <span className="tracking-tighter">Manugly</span>
              </Link>
            )}
          </div>
          <Menu />
          <BusinessSelect mini={mini} />
          {/* <div className="flex flex-col items-center justify-center gap-6 m-5">
            <BecomePro mini={mini} />
          </div> */}
        </div>
      </div>
    </BusinessWrapper>
  );
}
