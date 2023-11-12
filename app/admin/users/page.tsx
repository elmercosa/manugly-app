"use client";
import React from "react";

import BusinessWrapper from "@/components/business/businessWrapper";
import ParametersWrapper from "@/components/parameters/parametersWrapper";
import UsersTable from "@/components/users/usersTable";

export default function Users() {
  return (
    <main className="w-full">
      <BusinessWrapper>
        <ParametersWrapper>
          <UsersTable />
        </ParametersWrapper>
      </BusinessWrapper>
    </main>
  );
}
