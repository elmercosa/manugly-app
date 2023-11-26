import React from "react";

import AllWrapper from "@/components/allWrapper";
import RolesTable from "@/components/employees/roles/rolesTable";
import TopBar from "@/components/layout/private/topBar";

export default function Page() {
  return (
    <>
      <TopBar title="Roles de empleados" />
      <main className="w-full mt-32">
        <AllWrapper>
          <RolesTable />
        </AllWrapper>
      </main>
    </>
  );
}
