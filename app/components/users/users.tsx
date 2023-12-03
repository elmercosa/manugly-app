"use client";

import { Button, Link, Tooltip } from "@nextui-org/react";
import { IconEdit, IconSettings } from "@tabler/icons-react";

import { useBusiness } from "@/app/contexts/business/context";
import entityService from "@/services/entityService";
import { userService } from "@/services/userService";

import EntityTable from "../table/entityTable";
import AddUserForm from "./add";

export default function Users() {
  const BusinessContext = useBusiness();
  const columns = userService.columns;
  const queryKey = "users";
  const queryFn = entityService("users").getAll;
  const queryParams = BusinessContext.state.business.id;
  const actions: any[] = [];
  const tableHeader = () => {
    return (
      <>
        <Button
          href="/admin/users/config"
          as={Link}
          className="font-semibold text-white bg-manugly rounded-xl "
          startContent={<IconSettings size={20} className="font-semibold" />}
        >
          Configurar usuarios
        </Button>
        <AddUserForm />
      </>
    );
  };
  const filterFunction = (entities: any, filterValue: string) => {
    return entities.filter((user: any) => {
      return (
        user?.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
        user?.surname?.toLowerCase().includes(filterValue.toLowerCase()) ||
        user?.email?.toLowerCase().includes(filterValue.toLowerCase())
      );
    });
  };
  return (
    <EntityTable
      columns={columns}
      queryKey={queryKey}
      queryFn={queryFn}
      queryParams={queryParams}
      actions={actions}
      filterFunction={filterFunction}
      tableHeader={tableHeader}
      entityName="usuario"
      entityNamePlural="usuarios"
      endpoint="users"
    />
  );
}
