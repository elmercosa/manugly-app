"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import { slotService } from "@/services/slotService";
import { userService } from "@/services/userService";

import { PageLoader } from "../pageLoader";

export default function AddSlotForm({ session }: { session?: Session }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const customerId = session?.user as any;
  const [userId, setUserId] = useState("");

  const [slot, setSlot] = useState({ id: "" });
  const [enableQuery, setEnableQuery] = useState(false);

  const [fetchUsers, setFetchUsers] = useState(false);

  const [dateMax, setDateMax] = useState("");
  const [dateMin, setDateMin] = useState("");

  useEffect(() => {
    if (endDate !== "") {
      let date = new Date(endDate);
      date.setDate(date.getDate() - 1);
      setDateMax(date.toISOString().split("T")[0]);
    }

    if (startDate !== "") {
      let date = new Date(startDate);
      date.setDate(date.getDate() + 1);
      setDateMin(date.toISOString().split("T")[0]);
    }
  }, [endDate, startDate]);

  const businessContext = useBusiness();

  const { push } = useRouter();

  const { isLoading, data, isError, isFetched } = useQuery({
    queryKey: ["add-user"],
    queryFn: () => slotService.createSlot(slot),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const allUsers = useQuery({
    queryKey: ["all-users"],
    queryFn: () => userService.getAllUsers(businessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: fetchUsers,
  });

  const saveUser = async () => {
    setEnableQuery(true);
  };

  useEffect(() => {
    if (businessContext.state.business.id !== "") {
      setFetchUsers(true);
    }
  }, [businessContext.state.business.id]);

  useEffect(() => {
    if (data && !isLoading && isFetched) {
      toast.success("Cita creada correctamente");
      push(`/admin/slots/`);
    }

    if (isError) {
      toast.error("Ha ocurrido un error al crear la cita");
    }
  }, [isLoading, data, isError, isFetched, allUsers.data]);

  useEffect(() => {
    if (title && description && startDate && endDate && customerId && userId) {
      const slot = {
        id: "",
        title,
        description,
        start: startDate,
        end: endDate,
        customerId: customerId.id,
        userId,
      };
      setSlot(slot);
    }
  }, [title, description, startDate, endDate, customerId, userId]);

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-end w-full">
        <Button
          className="text-white bg-manugly"
          startContent={<IconDeviceFloppy size={20} />}
          onClick={saveUser}
          isLoading={enableQuery && isLoading}
        >
          Guardar
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl">
          <span className="text-xl font-semibold">
            Título de la cita
            <span className="font-semibold text-red-500">*</span>
          </span>
          <Input
            type="text"
            value={title}
            onValueChange={setTitle}
            placeholder="Elmer"
            isRequired
            variant="bordered"
            size="sm"
          />
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl">
          <span className="text-xl font-semibold">
            Descripción de la cita
            <span className="font-semibold text-red-500">*</span>
          </span>
          <Input
            type="text"
            value={description}
            onValueChange={setDescription}
            placeholder="Cortez"
            isRequired
            variant="bordered"
            size="sm"
          />
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl">
          <span className="text-xl font-semibold">
            Usuario
            <span className="font-semibold text-red-500">*</span>
          </span>
          <Select
            variant="bordered"
            placeholder="Selecciona un usuario"
            selectedKeys={[userId]}
            onChange={(event) => {
              setUserId(event.target.value);
            }}
          >
            {allUsers.isFetched &&
              allUsers.data.map((animal: any) => (
                <SelectItem key={animal.id} value={animal.id}>
                  {animal.name} {animal.surname}
                </SelectItem>
              ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl">
          <span className="text-xl font-semibold">
            Fecha de inicio
            <span className="font-semibold text-red-500">*</span>
          </span>
          <Input
            type="date"
            value={startDate}
            onValueChange={setStartDate}
            isRequired
            variant="bordered"
            size="sm"
            max={dateMax}
          />
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl">
          <span className="text-xl font-semibold">
            Fecha de fin
            <span className="font-semibold text-red-500">*</span>
          </span>
          <Input
            type="date"
            value={endDate}
            onValueChange={setEndDate}
            isRequired
            variant="bordered"
            size="sm"
            min={dateMin}
          />
        </div>
      </div>
      <PageLoader isLoading={allUsers.isLoading} text="Cargando..." />
      <PageLoader isLoading={isLoading} text="Guardando..." />
    </div>
  );
}
