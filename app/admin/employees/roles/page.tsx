import React from "react";

import AllWrapper from "@/components/allWrapper";
import Roles from "@/components/employees/roles/roles";
import TopBar from "@/components/layout/private/topBar";

export default function Page() {
  return (
    <>
      <TopBar title="Roles de empleados" />
      <main className="w-full mt-32">
        <AllWrapper>
          <Roles />
        </AllWrapper>
      </main>
    </>
  );
}
