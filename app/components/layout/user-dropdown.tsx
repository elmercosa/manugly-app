"use client";

import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  IconAdjustmentsAlt,
  IconBrush,
  IconLogout,
  IconRobotFace,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function UserDropdown({ session }: { session?: Session }) {
  const { email, image, name } = session?.user || {};
  const shortName = name?.charAt(0) || "Usuario";
  const logout = () => {
    signOut();
  };

  if (!email) return null;

  return (
    <div className="relative inline-block text-left cursor-pointer">
      <Dropdown
        placement="bottom-end"
        showArrow
        classNames={{
          base: "py-1 px-1 border border-default-200 dark:from-default-50 dark:to-black",
          arrow: "bg-emerald-100",
        }}
      >
        <DropdownTrigger>
          <Button className="p-4 font-bold bg-white rounded-xl">
            <Image src="/manugly.svg" alt="Manugly" width="24" height="24" />
            <p className="text-sm font-bold whitespace-nowrap">Hola, {name}</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="faded">
          <DropdownSection showDivider>
            <DropdownItem
              key="settings"
              startContent={<IconUser size={18} />}
              className="hover:bg-emerald-50"
            >
              Mi perfil
            </DropdownItem>
            <DropdownItem
              key="team_settings"
              startContent={<IconAdjustmentsAlt size={18} />}
            >
              Configuración
            </DropdownItem>
          </DropdownSection>
          <DropdownSection aria-label="Preferences" showDivider>
            <DropdownItem
              key="quick_search"
              shortcut="⌘K"
              startContent={<IconSearch size={18} />}
            >
              Buscar
            </DropdownItem>
            <DropdownItem
              isReadOnly
              key="theme"
              className="cursor-default"
              startContent={<IconBrush size={18} />}
              endContent={
                <select
                  className="cursor-pointer z-10 outline-none w-20 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                  id="theme"
                  name="theme"
                >
                  <option>Sistema</option>
                  <option>Oscuro</option>
                  <option>Claro</option>
                </select>
              }
            >
              Tema
            </DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onAction={(key) => logout()}
              startContent={<IconLogout size={18} />}
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
