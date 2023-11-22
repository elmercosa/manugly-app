"use client";

import {
  Button,
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
import { useQuery } from "react-query";

import { useBreadcrumb } from "@/app/contexts/breadcrumbs/context";
import { useBusiness } from "@/app/contexts/business/context";
import { userService } from "@/services/userService";

import AddUserForm from "./addUser";
import DeleteUser from "./deleteUser";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [enableQuery, setEnableQuery] = useState(false);

  const { state } = useBusiness();
  const breadcrumbContext = useBreadcrumb();

  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAllUsers(state.business.id ?? ""),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  useEffect(() => {
    breadcrumbContext.dispatch({
      type: "set",
      data: "Usuarios",
    });
  }, []);

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
