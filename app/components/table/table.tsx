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
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import {
  IconEdit,
  IconEye,
  IconPlus,
  IconRobotFace,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

import AddUserForm from "../users/addUser";
import DeleteUser from "../users/deleteUser";

export default function TableCustom({
  data,
  isLoading,
  columns,
}: {
  data: any;
  isLoading: boolean;
  columns: any;
}) {
  const [items, setItems] = useState([]);
  const [itemsFiltered, setItemsFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [visibleColumns, setVisibleColumns] = useState(new Set(columns) as any);

  //   const headerColumns = useMemo(() => {
  //     if (visibleColumns === "all") return columns;

  //     return columns.filter((column) =>
  //       Array.from(visibleColumns).includes(column.uid),
  //     );
  //   }, [visibleColumns]);

  useEffect(() => {
    if (data && !isLoading) {
      setItems(data);
      setPages(Math.ceil(data.length / rowsPerPage));
    }
  }, [isLoading, data, rowsPerPage]);

  useEffect(() => {
    if (items) {
      let itemsAux = items.filter((user: any) => {
        return (
          user?.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
          user?.surname?.toLowerCase().includes(filterValue.toLowerCase()) ||
          user?.email?.toLowerCase().includes(filterValue.toLowerCase())
        );
      });

      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      const itemsPaginated = [...itemsAux.slice(start, end)];

      setItemsFiltered(itemsPaginated);
      setPages(Math.ceil(itemsPaginated.length / rowsPerPage));
    }
  }, [filterValue, items, page, rowsPerPage]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  };

  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  useEffect(() => {
    console.log("selectedKeys :>> ", selectedKeys);
  }, [selectedKeys]);

  const handleFilterChange = (e: any) => {
    let selectedKeysAux = new Set(selectedKeys);
    if (selectedKeysAux.has(e)) {
      selectedKeysAux.delete(e);
    } else {
      selectedKeysAux.add(e);
    }
    console.log("selectedKeysAux :>> ", selectedKeysAux);
    setVisibleColumns(selectedKeysAux);
  };

  const topContent = useMemo(() => {
    return (
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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button variant="flat">Columns</Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onAction={handleFilterChange}
              >
                {columns.map((column: any) => (
                  <DropdownItem key={column} className="capitalize">
                    {column}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Multiple selection example"
                variant="flat"
                closeOnSelect={false}
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onAction={handleFilterChange}
              >
                <DropdownItem key="text">Text</DropdownItem>
                <DropdownItem key="number">Number</DropdownItem>
                <DropdownItem key="date">Date</DropdownItem>
                <DropdownItem key="single_date">Single Date</DropdownItem>
                <DropdownItem key="iteration">Iteration</DropdownItem>
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
    );
  }, [filterValue]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="text-default-400 text-small">
          Total {items.length} usuarios
        </span>
        <Pagination
          isCompact
          showControls
          showShadow={false}
          classNames={{
            wrapper: "shadow-none text-white font-semibold",
          }}
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages, items]);
  return (
    <>
      <Table
        aria-label="Example static collection table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        topContent={topContent}
        topContentPlacement="outside"
        classNames={{
          table: `${isLoading ? "min-h-[400px]" : ""}`,
          base: "shadow-none rounded-xl",
          wrapper: "shadow-none rounded-xl",
        }}
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>APELLIDOS</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner />}
          items={itemsFiltered ?? []}
          emptyContent={
            isLoading ? "Cargando..." : "No hay usuarios que mostrar"
          }
        >
          {(item: any) => (
            <TableRow key={item?.id}>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.surname}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar usuario">
                    <Button
                      startContent={<IconEdit size={16} />}
                      as={Link}
                      href={`/admin/users/edit/${item?.id}`}
                      size="sm"
                      className="w-7 h-7 min-h-[28px] min-w-[28px]"
                      isIconOnly
                      variant="flat"
                    ></Button>
                  </Tooltip>
                  <DeleteUser id={item?.id} />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
