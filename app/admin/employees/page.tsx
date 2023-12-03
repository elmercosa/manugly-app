import React from "react";

import AllWrapper from "@/components/allWrapper";
import Employees from "@/components/employees/employees";
import TopBar from "@/components/layout/private/topBar";

export default function Page() {
  return (
    <>
      <TopBar title="Empleados" />
      <main className="w-full mt-32">
        <AllWrapper>
          <Employees />
        </AllWrapper>
      </main>
    </>
  );
}
