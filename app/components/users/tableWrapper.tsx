"use client";

import { BusinessProvider } from "@/app/contexts/business/context";
import UsersTable from "@/components/users/usersTable";

export default function TableWrapper() {
  return (
    <BusinessProvider>
      <UsersTable />
    </BusinessProvider>
  );
}
