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
import { userService } from "@/services/userService";

import useDataQuery from "../../../hooks/useDataQuery";
import useEnableQuery from "../../../hooks/useEnableQuery";
import AddUserForm from "./addUser";
import DeleteUser from "./deleteUser";

export default function UsersTable() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let columns = userService.columns;
  const columnsKeys: Selection = new Set<string>(
    columns.map((column) => column.key),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(columnsKeys),
  );

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

  useEffect(() => {
    if (users) {
      setPages(Math.ceil(users.length / rowsPerPage));
    }
  }, [users, rowsPerPage]);

  useEffect(() => {
    if (users) {
      let dataFiltered = users.filter((user: any) => {
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
  }, [filterValue, users, page, rowsPerPage]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="text-default-400 text-small">
          Total {users.length} usuarios
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
  }, [page, pages, users]);

  const renderCell = useCallback((data: any, columnKey: any) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar usuario">
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
            <DeleteUser id={data.id} />
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
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<IconChevronDown size={14} />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {column.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Button
              href="/admin/users/config"
              as={Link}
              className="font-semibold text-white bg-manugly rounded-xl "
              startContent={
                <IconSettings size={20} className="font-semibold" />
              }
            >
              Configurar usuarios
            </Button>
            <AddUserForm />
          </div>
        </div>
      </div>
      <Table
        aria-label="Example static collection table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        topContentPlacement="outside"
        classNames={{
          table: `${GetUsers.isLoading ? "min-h-[400px]" : ""}`,
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
          isLoading={GetUsers.isLoading}
          loadingContent={<Spinner />}
          items={items ?? []}
          emptyContent={
            GetUsers.isLoading ? "Cargando..." : "No hay usuarios que mostrar"
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
