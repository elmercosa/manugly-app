import React from "react";

import AllWrapper from "@/components/allWrapper";
import EmployeesTable from "@/components/employees/employeesTable";
import TopBar from "@/components/layout/private/topBar";

export default function Page() {
  return (
    <>
      <TopBar title="Empleados" />
      <main className="w-full mt-32">
        <AllWrapper>
          <EmployeesTable />
        </AllWrapper>
      </main>
    </>
  );
}
