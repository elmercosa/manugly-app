"use client";

import {
  IconBrandMastercard,
  IconBriefcase,
  IconCalendarEvent,
  IconChartBar,
  IconClipboardData,
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();
  const menuClass =
    "flex items-center justify-start gap-4 px-4 py-3 font-semibold transition-all rounded-lg hover:text-white hover:bg-emerald-500 hover:shadow-md ";
  const active = menuClass + "bg-emerald-500 text-white";
  return (
    <div className="flex h-[80%] flex-col w-full px-5 gap-1">
      <Link
        href="/private"
        className={pathname == "/private" ? active : menuClass}
      >
        <IconHome size={20} />
        Inicio
      </Link>
      <Link href="/private" className={menuClass}>
        <IconBriefcase size={20} />
        Productos
      </Link>
      <Link href="/private" className={menuClass}>
        <IconChartBar size={20} />
        Campañas
      </Link>
      <Link href="/private" className={menuClass}>
        <IconCalendarEvent size={20} />
        Horarios
      </Link>
      <Link href="/private" className={menuClass}>
        <IconBrandMastercard size={20} />
        Metodos de pago
      </Link>
      <Link href="/private" className={menuClass}>
        <IconClipboardData size={20} />
        Estatutos
      </Link>
      <Link href="/private" className={menuClass}>
        <IconSettings size={24} />
        Configuración
      </Link>
    </div>
  );
}
