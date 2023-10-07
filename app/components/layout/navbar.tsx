"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

import useScroll from "@/lib/hooks/use-scroll";

import UserDropdown from "./user-dropdown";

export default function NavBar() {
  const scrolled = useScroll(50);

  return (
    <div
      className={`fixed top-0 w-full grid grid-cols-12 border-b border-primary/10 backdrop-blur-xl dark:border-gray-700 dark:bg-black/50 bg-white/0 z-30 transition-all`}
    >
      <div className="flex items-center justify-between h-16 col-start-2 col-end-12">
        <Link
          href="/"
          className="flex items-center text-2xl font-bold text-primary"
        >
          Manugly
        </Link>
        <div>
          <Button
            href="/login"
            as={Link}
            color="primary"
            className="text-white font-bold"
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
