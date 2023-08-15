"use client";
import React from "react";
import { ModalLogin } from "@/components/auth/modal-login";
import AvatarDemo from "@/components/avatar/demo";

export default function DesingSystem() {
  return (
    <div className="flex flex-col col-start-2 col-end-12">
      <div className="flex flex-col gap-4">
        <AvatarDemo></AvatarDemo>
      </div>
    </div>
  );
}
