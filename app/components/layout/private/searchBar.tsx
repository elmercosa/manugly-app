"use client";
import { Input } from "@nextui-org/react";
import { IconSearch } from "@tabler/icons-react";
export default function SearchBar() {
  return (
    <Input
      classNames={{
        base: "max-w-full h-full",
        input: "text-small",
        inputWrapper: "h-full text-default-500 rounded-full",
      }}
      placeholder="Escribe para buscar..."
      size="sm"
      startContent={<IconSearch size={18} className="text-black" />}
      type="search"
    />
  );
}
