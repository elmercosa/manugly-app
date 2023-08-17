"use client";

import Image from "next/image";
import { Session } from "next-auth";
import {
  Avatar,
  AvatarGroup,
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image, name } = session?.user || {};
  const shortName = name?.charAt(0) || "Usuario";
  const logout = () => {
    signOut();
  };

  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: image,
              name: shortName,
            }}
            className="transition-transform"
            name={name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownSection title="Actions" showDivider>
            <DropdownItem key="settings">Mi perfil</DropdownItem>
            <DropdownItem key="team_settings">Configuración</DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger zone">
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onAction={(key) => logout()}
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
