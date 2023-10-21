"use client";
import { useAtom } from "jotai";

import { businessAtom } from "@/app/store/store";

export default function SearchBar() {
  const [business, setBusiness] = useAtom(businessAtom);

  return (
    <div className="p-2 bg-emerald-500 rounded-3xl text-white text-sm font-semibold">
      {business?.name}
    </div>
  );
}
