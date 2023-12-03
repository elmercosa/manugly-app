import React from "react";

import AllWrapper from "@/components/allWrapper";
import TopBar from "@/components/layout/private/topBar";
import Users from "@/components/users/users";

export default function Page() {
  return (
    <>
      <TopBar title="Usuarios" />
      <main className="w-full mt-32">
        <AllWrapper>
          <Users />
        </AllWrapper>
      </main>
    </>
  );
}
