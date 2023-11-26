"use client";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useBusiness } from "@/app/contexts/business/context";
import { userService } from "@/services/userService";

import useDataQuery from "../../../hooks/useDataQuery";
import useEnableQuery from "../../../hooks/useEnableQuery";
import TableCustom from "../table/table";

export default function TableUsers() {
  const BusinessContext = useBusiness();

  const enableQuery = useEnableQuery(BusinessContext.state.business.id);
  const GetUsers = useQuery({
    queryKey: "users",
    queryFn: () => userService.getAllUsers(BusinessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });
  const users = useDataQuery(BusinessContext.state.business.id, GetUsers);
  const columns = userService.columns;

  return (
    <TableCustom
      data={users}
      isLoading={GetUsers.isLoading}
      columns={columns}
    />
  );
}
