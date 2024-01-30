"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { IconDeviceFloppy, IconPlus, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import entityService from "@/services/entityService";

export default function CalendarPopover({
  index,
  day,
  row,
  rows,
  date,
  users,
  employees,
  businessId,
  slotTypes,
  findSlots,
  children,
}: {
  index: any;
  day: any;
  row: any;
  rows: any;
  date: any;
  users: any;
  employees: any;
  businessId: any;
  slotTypes: any;
  findSlots: any;
  children: React.ReactNode;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState([] as any);
  const [employeeId, setEmployeeId] = useState([] as any);
  const [slotTypeId, setSlotTypeId] = useState([] as any);
  const [enableQuery, setEnableQuery] = useState(false);
  const [slot, setSlot] = useState({} as any);

  const startHours = row.startDate.split(":");
  const endHours = row.endDate.split(":");

  const dateStart = new Date(
    new Date(date.date).setHours(parseInt(startHours[0]) + 1, startHours[1], 0),
  );
  const dateEnd = new Date(
    new Date(date.date).setHours(parseInt(endHours[0]) + 1, endHours[1], 0),
  );

  const [startDate, setStartDate] = useState(
    dateStart.toISOString().substring(0, 16),
  );
  const [endDate, setEndDate] = useState(
    dateEnd.toISOString().substring(0, 16),
  );

  const AddSlot = useQuery({
    queryKey: "add-slot",
    queryFn: () => entityService("slots").create(slot),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const saveUser = async () => {
    setEnableQuery(true);
    if (AddSlot.isFetched) {
      AddSlot.refetch();
    }
  };
  useEffect(() => {
    let user = [...userId][0];
    let employee = [...employeeId][0];
    let slotType = [...slotTypeId][0];
    setSlot({
      title,
      description,
      start: startDate,
      end: endDate,
      customerId: employee,
      userId: user,
      businessId: businessId,
      slotTypeId: slotType,
      parentId: null,
    });
  }, [userId, employeeId, title, description, startDate, endDate]);

  useEffect(() => {
    if (AddSlot.data && !AddSlot.isLoading && AddSlot.isFetched) {
      toast.success("Cita creada correctamente", {
        toastId: "add-slot",
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    }

    if (AddSlot.isError) {
      toast.error("Ha ocurrido un error al crear la cita", {
        toastId: "error-slot",
      });
    }
  }, [AddSlot.isLoading, AddSlot.data, AddSlot.isError, AddSlot.isFetched]);

  return (
    <Popover
      key={index}
      showArrow={true}
      placement="right"
      classNames={{
        base: "w-[550px]",
      }}
      radius="none"
      shadow="md"
    >
      <PopoverTrigger className="transition-background aria-expanded:scale-100 aria-expanded:opacity-100 aria-expanded:bg-secondary/50 hover:bg-secondary/50 group">
        {children}
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col w-full gap-2 p-2">
          <h2 className="ml-2 text-xl font-semibold">Cita</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center w-full gap-1">
              <Select
                variant="bordered"
                placeholder="Usuario"
                selectionMode="single"
                onSelectionChange={setUserId}
                size="sm"
              >
                {users.map((user: any) => (
                  <SelectItem key={user.id} value={user.id}>
                    {`${user.name} ${user.surname}`}
                  </SelectItem>
                ))}
              </Select>
              <Select
                variant="bordered"
                placeholder="Empleado"
                selectionMode="single"
                onSelectionChange={setEmployeeId}
                size="sm"
              >
                {employees.map((employee: any) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                variant="bordered"
                placeholder="Tipo de cita"
                selectionMode="single"
                onSelectionChange={setSlotTypeId}
                size="sm"
              >
                {slotTypes.map((slotType: any) => (
                  <SelectItem key={slotType.id} value={slotType.id}>
                    {slotType.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-center w-full gap-1">
              <Input
                label="Fecha de inicio"
                type="datetime-local"
                value={startDate}
                onValueChange={setStartDate}
                isRequired
                variant="bordered"
                size="sm"
                placeholder="a"
              />
              <Input
                label="Fecha de fin"
                type="datetime-local"
                value={endDate}
                onValueChange={setEndDate}
                isRequired
                variant="bordered"
                size="sm"
                placeholder="a"
              />
            </div>
            <Input
              label="Título de la cita"
              type="text"
              value={title}
              onValueChange={setTitle}
              isRequired
              variant="bordered"
              size="sm"
            />
            <Textarea
              label="Descripción de la cita"
              type="text"
              value={description}
              onValueChange={setDescription}
              isRequired
              variant="bordered"
              size="sm"
              maxRows={2}
            />
            <div className="flex items-center justify-center w-full gap-2">
              <Button
                className="w-full"
                startContent={<IconX size={16} />}
                color="danger"
                size="sm"
              >
                Cancelar
              </Button>
              <Button
                className="w-full font-semibold text-white bg-manugly"
                startContent={<IconDeviceFloppy size={16} />}
                size="sm"
                onPress={saveUser}
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
