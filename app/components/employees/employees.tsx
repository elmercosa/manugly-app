"use client";

import { Button, Link } from "@nextui-org/react";
import { IconSettings } from "@tabler/icons-react";

import { useBusiness } from "@/app/contexts/business/context";
import { employeeService } from "@/services/employeeService";
import entityService from "@/services/entityService";

import EntityTable from "../table/entityTable";
import AddEmployee from "./add";

export default function Employees() {
  const BusinessContext = useBusiness();
  const columns = employeeService.columns;
  const queryKey = "employees";
  const queryFn = entityService("employees").getAll;
  const queryParams = BusinessContext.state.business.id;
  const actions: any[] = [];
  const tableHeader = () => {
    return (
      <>
        <Button
          href="/admin/employees/roles"
          as={Link}
          className="font-semibold text-white bg-manugly rounded-xl "
          startContent={<IconSettings size={20} className="font-semibold" />}
        >
          Configurar roles
        </Button>
        <AddEmployee />
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
      entityName="empleado"
      entityNamePlural="empleados"
      endpoint="employees"
    />
  );
}
