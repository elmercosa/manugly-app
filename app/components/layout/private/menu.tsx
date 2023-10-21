"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  IconBrandMastercard,
  IconCalendarEvent,
  IconChartBar,
  IconClipboardData,
  IconHome,
  IconSettings,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { title } from "process";

export default function Menu() {
  const pathname = usePathname();
  const menuClass =
    "flex items-center justify-start gap-4 px-4 py-3 font-semibold transition-all rounded-lg hover:text-white hover:bg-emerald-500 hover:shadow-md ";
  const active = menuClass + "bg-emerald-500 text-white";
  const secondaryClass = "flex items-center justify-start gap-4 px-4 py-2";
  const activeSecondary = "text-emerald-600";
  const motionProps = {
    variants: {
      enter: {
        y: 0,
        opacity: 1,
        height: "auto",
        transition: {
          height: {
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 1,
          },
          opacity: {
            easings: "ease",
            duration: 0.8,
          },
        },
      },
      exit: {
        y: -10,
        opacity: 0,
        height: 0,
        transition: {
          height: {
            easings: "ease",
            duration: 0.25,
          },
          opacity: {
            easings: "ease",
            duration: 0.2,
          },
        },
      },
    },
  };
  return (
    <div className="flex h-[80%] flex-col w-full px-5 gap-1">
      <Link
        href="/private"
        className={pathname == "/private" ? active : menuClass}
      >
        <IconHome size={20} />
        Inicio
      </Link>
      <Link
        href="/private/users/"
        className={pathname == "/private/users" ? active : menuClass}
      >
        <IconUsersGroup size={20} />
        Usuarios
      </Link>
      <Link
        href="/private"
        className={pathname == "/private/1" ? active : menuClass}
      >
        <IconChartBar size={20} />
        Campañas
      </Link>
      <Link
        href="/private"
        className={pathname == "/private/1" ? active : menuClass}
      >
        <IconCalendarEvent size={20} />
        Horarios
      </Link>
      <Link
        href="/private"
        className={pathname == "/private/1" ? active : menuClass}
      >
        <IconBrandMastercard size={20} />
        Metodos de pago
      </Link>
      <Link
        href="/private"
        className={pathname == "/private/1" ? active : menuClass}
      >
        <IconSettings size={24} />
        Configuración
      </Link>
    </div>
  );
}
