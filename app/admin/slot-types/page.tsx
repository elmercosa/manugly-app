import React from "react";

import AllWrapper from "@/components/allWrapper";
import TopBar from "@/components/layout/private/topBar";

export default function Users() {
  return (
    <>
      <TopBar title="Empleados" />
      <main className="w-full mt-32">
        <AllWrapper>{/* <UsersTable /> */}</AllWrapper>
      </main>
    </>
  );
}
