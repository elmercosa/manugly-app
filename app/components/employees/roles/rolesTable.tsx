"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Pagination,
  Select,
  Selection,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import {
  IconChevronDown,
  IconEdit,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useBusiness } from "@/app/contexts/business/context";
import { employeeRolesService } from "@/services/employeeRolesService";
import entityService from "@/services/entityService";

import useDataQuery from "../../../../hooks/useDataQuery";
import useEnableQuery from "../../../../hooks/useEnableQuery";
import AddEmployee from "./add";
import AddEmployeeRole from "./add";
import DeleteEmployee from "./delete";
// import AddUserForm from "./addUser";
// import DeleteUser from "./deleteUser";

export default function RolesTable() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let columns = employeeRolesService.columns;
  const columnsKeys: Selection = new Set<string>(
    columns.map((column) => column.key),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(columnsKeys),
  );

  const BusinessContext = useBusiness();

  const enableQuery = useEnableQuery(BusinessContext.state.business.id);
  const GetEmployees = useQuery({
    queryKey: "employees-roles",
    queryFn: () =>
      entityService("roles").getAll(BusinessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });
  const employees = useDataQuery(
    BusinessContext.state.business.id,
    GetEmployees,
  );

  useEffect(() => {
    if (employees) {
      console.log("employees :>> ", employees);
      setPages(Math.ceil(employees.length / rowsPerPage));
    }
  }, [employees, rowsPerPage]);

  useEffect(() => {
    if (employees) {
      let dataFiltered = employees.filter((user: any) => {
        return (
          user?.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
          user?.surname?.toLowerCase().includes(filterValue.toLowerCase()) ||
          user?.email?.toLowerCase().includes(filterValue.toLowerCase())
        );
      });

      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      const dataPaginated = [...dataFiltered.slice(start, end)];

      setItems(dataPaginated);
      setPages(Math.ceil(dataFiltered.length / rowsPerPage));
    }
  }, [filterValue, employees, page, rowsPerPage]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="text-default-400 text-small">
          Total {employees.length} empleados
        </span>
        <Pagination
          isCompact
          showControls
          showShadow={false}
          classNames={{
            wrapper: "shadow-none text-white font-semibold",
            item: "bg-white",
            next: "bg-white",
            prev: "bg-white",
          }}
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages, employees]);

  const renderCell = useCallback((data: any, columnKey: any) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar empleado">
              <Button
                startContent={<IconEdit size={16} />}
                as={Link}
                href={`/admin/users/edit/${data.id}`}
                size="sm"
                className="w-7 h-7 min-h-[28px] min-w-[28px]"
                isIconOnly
                variant="flat"
              ></Button>
            </Tooltip>
            <DeleteEmployee id={data.id} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-end justify-between gap-3 ">
          <div className="flex items-center justify-start w-1/2 gap-3">
            <div className="flex">
              <Input
                isClearable
                classNames={{
                  inputWrapper:
                    "border-none bg-white shadow-none rounded-xl w-96",
                }}
                startContent={<IconSearch size={20} />}
                placeholder="Buscar por nombre, apellidos, email..."
                value={filterValue}
                onValueChange={setFilterValue}
                radius="none"
                variant="bordered"
                size="sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-end w-1/2 gap-3">
            <AddEmployeeRole />
          </div>
        </div>
      </div>
      <Table
        aria-label="Example static collection table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        topContentPlacement="outside"
        classNames={{
          table: `${GetEmployees.isLoading ? "min-h-[400px]" : ""}`,
          base: "shadow-none rounded-xl",
          wrapper: "shadow-none rounded-xl",
        }}
      >
        <TableHeader columns={columns}>
          {(column: any) =>
            (visibleColumns as Set<string>).has(column.key) ? (
              <TableColumn key={column.key} className="uppercase">
                {column.label}
              </TableColumn>
            ) : (
              <></>
            )
          }
        </TableHeader>
        <TableBody
          isLoading={GetEmployees.isLoading}
          loadingContent={<Spinner />}
          items={items ?? []}
          emptyContent={
            GetEmployees.isLoading
              ? "Cargando..."
              : "No hay empleados que mostrar"
          }
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey: any) =>
                (visibleColumns as Set<string>).has(columnKey) ? (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                ) : (
                  <></>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
