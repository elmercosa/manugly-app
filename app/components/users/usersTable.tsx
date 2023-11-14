"use client";

import {
  Button,
  Input,
  Link,
  Pagination,
  Select,
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
  IconEdit,
  IconEye,
  IconPlus,
  IconRobotFace,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useBusiness } from "@/app/contexts/business/context";
import { userService } from "@/services/userService";

import AddUserForm from "./addForm";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [enableQuery, setEnableQuery] = useState(false);

  const { state } = useBusiness();

  const { isLoading, data } = useQuery({
    queryKey: ["users", state.business.id],
    queryFn: () => userService.getAllUsers(state.business.id ?? ""),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  useEffect(() => {
    if (state.business.id !== "") {
      setEnableQuery(true);
    }
  }, [state.business.id]);

  useEffect(() => {
    if (data && !isLoading) {
      setUsers(data);
      setPages(Math.ceil(data.length / rowsPerPage));
    }
  }, [isLoading, data, rowsPerPage]);

  useEffect(() => {
    if (users) {
      let usersFiltered = users.filter((user: any) => {
        return (
          user?.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
          user?.surname?.toLowerCase().includes(filterValue.toLowerCase()) ||
          user?.email?.toLowerCase().includes(filterValue.toLowerCase())
        );
      });

      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      const usersPaginated = [...usersFiltered.slice(start, end)];

      setItems(usersPaginated);
      setPages(Math.ceil(usersFiltered.length / rowsPerPage));
    }
  }, [filterValue, users, page, rowsPerPage]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between gap-3 items-end ">
          <div className="flex gap-3 w-1/2 items-center justify-start">
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
          <div className="flex gap-3 w-1/2 items-center justify-end">
            <Button
              href="/admin/users/config"
              as={Link}
              className="bg-emerald-500 text-white font-semibold rounded-xl "
              startContent={
                <IconSettings size={20} className="font-semibold" />
              }
            >
              Configurar usuarios
            </Button>
            <Button
              href="/admin/users/add"
              as={Link}
              className="bg-emerald-500 text-white font-semibold rounded-xl "
              startContent={<IconPlus size={20} className="font-semibold" />}
            >
              Añadir usuario
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterValue]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {users.length} usuarios
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
  }, [page, pages, users]);
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
          items={items ?? []}
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
                  <Tooltip content="Editar parámetros">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <Link
                        href={`/admin/users/parameters/${item?.id}`}
                        className="text-gray-400"
                      >
                        <IconRobotFace />
                      </Link>
                    </span>
                  </Tooltip>
                  {/* <Tooltip content="Editar usuario">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <Link
                        href={`/admin/users/edit/${item?.id}`}
                        className="text-gray-400"
                      >
                        <IconEdit />
                      </Link>
                    </span>
                  </Tooltip> */}
                  {/* <Tooltip color="danger" content="Borrar usuario">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <Link href="#" color="danger">
                        <IconTrash />
                      </Link>
                    </span>
                  </Tooltip> */}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
