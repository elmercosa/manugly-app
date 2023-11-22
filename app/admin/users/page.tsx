"use client";
import React from "react";

import BreadcrumbWrapper from "@/components/breadcrumb/breadcrumbWrapper";
import BusinessWrapper from "@/components/business/businessWrapper";
import ParametersWrapper from "@/components/parameters/parametersWrapper";
import UsersTable from "@/components/users/usersTable";

export default function Users() {
  return (
    <main className="w-full" key={new Date().getTime()}>
      <BusinessWrapper>
        <ParametersWrapper>
          <BreadcrumbWrapper>
            <UsersTable />
          </BreadcrumbWrapper>
        </ParametersWrapper>
      </BusinessWrapper>
    </main>
  );
}
