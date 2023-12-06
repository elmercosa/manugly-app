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
  Selection,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { IconChevronDown, IconEdit, IconSearch } from "@tabler/icons-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useBusiness } from "@/app/contexts/business/context";

import useDataQuery from "../../../hooks/useDataQuery";
import useEnableQuery from "../../../hooks/useEnableQuery";
import DeleteEntity from "./delete";
import EditEntity from "./edit";

export default function EntityTable({
  columns,
  queryFn,
  queryKey,
  queryParams,
  actions,
  filterFunction,
  tableHeader,
  entityName,
  entityNamePlural,
  endpoint,
}: {
  columns: any;
  queryKey: string;
  queryFn: any;
  queryParams: any;
  actions?: any;
  filterFunction?: any;
  tableHeader?: any;
  entityName: string;
  entityNamePlural?: string;
  endpoint: string;
}) {
  const [items, setItems] = useState([] as any);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(
    React.useState<Selection>(["10"]),
  );
  const rows = ["10", "50", "100"];

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: columns[0].key,
    direction: "ascending",
  });

  const columnsKeys: Selection = new Set<string>(
    columns.map((column: any) => column.key),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(columnsKeys),
  );

  const [selectedColumns, setSelectedColumns] = useState(columns);

  const BusinessContext = useBusiness();

  const enableQuery = useEnableQuery(BusinessContext.state.business.id);
  const GetEntities = useQuery({
    queryKey: queryKey,
    queryFn: () => queryFn(queryParams),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });
  const entities = useDataQuery(BusinessContext.state.business.id, GetEntities);

  useEffect(() => {
    if (entities) {
      setPages(Math.ceil(entities.length / rowsPerPage));
    }
  }, [entities, rowsPerPage]);

  useEffect(() => {
    if (entities) {
      let dataFiltered = filterFunction(entities, filterValue);

      // sort
      let dataSorted = dataFiltered;
      if (sortDescriptor.column) {
        dataSorted = dataFiltered.sort((a: any, b: any) => {
          const first = a[sortDescriptor.column ?? columns[0].key] as number;
          const second = b[sortDescriptor.column ?? columns[0].key] as number;
          const cmp = first < second ? -1 : first > second ? 1 : 0;

          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
      }

      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      const dataPaginated = [...dataSorted.slice(start, end)];

      setItems(dataPaginated);
      setPages(Math.ceil(dataSorted.length / rowsPerPage));
    }
  }, [filterValue, entities, page, rowsPerPage, sortDescriptor]);

  useEffect(() => {
    setSelectedColumns(
      columns.filter((column: any) =>
        (visibleColumns as Set<string>).has(column.key),
      ),
    );
  }, [visibleColumns]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="text-default-400 text-small">
          Total {entities.length} {entityNamePlural}
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
  }, [page, pages, entities]);

  const renderCell = useCallback((data: any, columnKey: any) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <EditEntity
              id={data.id}
              endpoint={endpoint}
              entityName={entityName}
            />
            <DeleteEntity
              id={data.id}
              endpoint={endpoint}
              entityName={entityName}
            />
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
                placeholder={`Buscar ${entityName}`}
                value={filterValue}
                onValueChange={setFilterValue}
                radius="none"
                variant="bordered"
                size="sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-end w-1/2 gap-3">
            <Dropdown
              classNames={{
                trigger: "bg-white",
              }}
            >
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<IconChevronDown size={14} />}
                  variant="flat"
                >
                  Columnas
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
                {columns.map((column: any) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {column.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              classNames={{
                trigger: "bg-white",
              }}
            >
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<IconChevronDown size={14} />}
                  variant="flat"
                >
                  Nº de elementos
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                selectedKeys={["10"]}
                // onSelectionChange={setRowsPerPage}
              >
                {rows.map((row: any) => (
                  <DropdownItem key={row} className="capitalize">
                    {row}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {tableHeader && tableHeader()}
          </div>
        </div>
      </div>
      <Table
        aria-label="Example static collection table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        topContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          table: `${GetEntities.isLoading ? "min-h-[400px]" : ""}`,
          base: "shadow-none rounded-xl",
          wrapper: "shadow-none rounded-xl",
        }}
      >
        <TableHeader columns={selectedColumns}>
          {(column: any) => (
            <TableColumn
              key={column.key}
              className="uppercase"
              allowsSorting={true}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={GetEntities.isLoading}
          loadingContent={<Spinner />}
          items={items ?? []}
          emptyContent={
            GetEntities.isLoading
              ? "Cargando..."
              : `No hay ${entityNamePlural} para mostrar`
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
