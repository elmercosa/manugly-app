"use client";
import React from "react";
import { ModalLogin } from "@/components/auth/modal-login";
import AvatarDemo from "@/components/generic/avatar/demo";
import { Link } from "@nextui-org/react";

export default function DesingSystem() {
  return (
    <div className="col-start-2 col-end-12 grid grid-cols-6 mt-10">
      <div className="col-start-1 col-end-2 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Componentes:</h2>
        <ul className="list-inside pl-2">
          <li className="list-disc">
            <Link href="#avatar">Avatar</Link>
          </li>
        </ul>
      </div>
      <div className="col-start-2 col-end-7 flex flex-col gap-4 mt-5">
        <AvatarDemo></AvatarDemo>
      </div>
    </div>
  );
}
