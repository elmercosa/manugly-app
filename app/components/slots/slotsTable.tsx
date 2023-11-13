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
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import { slotService } from "@/services/slotService";

import { PageLoader } from "../pageLoader";

export default function SlotsTable() {
  const [slots, setSlots] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [enableQuery, setEnableQuery] = useState(false);
  const [slotSelected, setSlotSelected] = useState({ id: "" });

  const [deleteSlot, setDeleteSlot] = useState(false);

  const { state } = useBusiness();

  const { isLoading, data } = useQuery({
    queryKey: ["slots", state.business.id],
    queryFn: () => slotService.getAllSlots(state.business.id ?? ""),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const removeSlots = useQuery({
    queryKey: ["removeSlot", slotSelected.id],
    queryFn: () => slotService.removeSlot(slotSelected.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: deleteSlot,
  });

  const handleRemoveSlot = (slot: any) => {
    setSlotSelected(slot);
    setDeleteSlot(true);
  };

  useEffect(() => {
    if (removeSlots.data && !removeSlots.isLoading) {
      setEnableQuery(true);
      setDeleteSlot(false);
      toast.success("Cita eliminada correctamente");
      window.location.reload();
    }

    if (removeSlots.isError) {
      toast.error("Error al eliminar la cita");
    }
  }, [removeSlots.data, removeSlots.isError, removeSlots.isLoading]);

  useEffect(() => {
    if (state.business.id !== "") {
      setEnableQuery(true);
    }
  }, [state.business.id]);

  useEffect(() => {
    if (data && !isLoading) {
      console.log("slots :>> ", data);
      setSlots(data);
      setPages(Math.ceil(data.length / rowsPerPage));
    }
  }, [isLoading, data, rowsPerPage]);

  useEffect(() => {
    if (slots) {
      let usersFiltered = slots;

      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      const usersPaginated = [...usersFiltered.slice(start, end)];

      setItems(usersPaginated);
      setPages(Math.ceil(usersFiltered.length / rowsPerPage));
    }
  }, [filterValue, slots, page, rowsPerPage]);

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
                placeholder="Buscar por título, descripción"
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
              className="bg-emerald-500 text-white  rounded-xl  font-semibold"
              startContent={<IconPlus size={20} className="font-semibold" />}
              as={Link}
              href="/admin/slots/add"
            >
              Añadir evento
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
          Total {slots.length} citas
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
  }, [page, pages, slots]);
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
          <TableColumn>TÍTULO</TableColumn>
          <TableColumn>DESCRIPCIÓN</TableColumn>
          <TableColumn>FECHA DE INICIO</TableColumn>
          <TableColumn>FECHA DE FIN</TableColumn>
          <TableColumn>USUARIO</TableColumn>
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
              <TableCell>{item?.title}</TableCell>
              <TableCell>{item?.description}</TableCell>
              <TableCell>
                {new Date(item?.start).toLocaleDateString()}
              </TableCell>
              <TableCell> {new Date(item?.end).toLocaleDateString()}</TableCell>
              <TableCell>
                {item?.user.name} {item?.user.surname}
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  {/* <Tooltip content="Ver usuario">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <Link
                        href={`/admin/users/details/${item?.id}`}
                        className="text-gray-400"
                      >
                        <IconEye />
                      </Link>
                    </span>
                  </Tooltip> */}
                  {/* <Tooltip content="Editar usuario">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <Link href="/admin/users/edit" className="text-gray-400">
                        <IconEdit />
                      </Link>
                    </span>
                  </Tooltip> */}
                  <Tooltip color="danger" content="Borrar cita">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <Button
                        href="#"
                        color="danger"
                        isIconOnly
                        variant="light"
                        size="sm"
                        onClick={() => {
                          handleRemoveSlot(item);
                        }}
                      >
                        <IconTrash />
                      </Button>
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PageLoader isLoading={removeSlots.isLoading} text="Borrando cita..." />
    </>
  );
}
