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

import CalendarPopover from "./calendarPopover";

export default function CalendarForm({
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
    <td
      className={`gap-1 flex flex-col p-1 cursor-pointer h-full border-default-200 border-t border-l last:border-r ${
        rows.length - 1 == index ? "border-b" : ""
      }`}
    >
      {findSlots.map((slot: any, index: number) => (
        <CalendarPopover
          employees={employees}
          users={users}
          key={"form-" + index}
          day={day}
          row={row}
          index={index}
          rows={rows}
          date={date}
          businessId={businessId}
          slotTypes={slotTypes}
          findSlots={findSlots}
        >
          <div
            key={index}
            className="flex flex-col gap-2 p-2 rounded-lg bg-secondary/10"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{slot.title}</div>
                <div className="text-xs text-gray-500">
                  {new Date(slot.start).getHours()}:
                  {`${new Date(slot.start).getMinutes()}`.padStart(2, "0")}
                </div>
              </div>
              <div className="text-xs text-gray-500">{`${slot.user.name} ${slot.user.surname}`}</div>
              <div className="p-1 text-xs text-gray-500 bg-white rounded-xl w-fit">
                {slot.slotType.name}
              </div>
            </div>
          </div>
        </CalendarPopover>
      ))}
      <CalendarPopover
        employees={employees}
        users={users}
        key={"form-" + index}
        day={day}
        row={row}
        index={index}
        rows={rows}
        date={date}
        businessId={businessId}
        slotTypes={slotTypes}
        findSlots={findSlots}
      >
        <div className="flex items-center justify-center w-full h-full bg-white border rounded-lg group-hover:text-white">
          <IconPlus size={14}></IconPlus>
        </div>
      </CalendarPopover>
    </td>
  );
}
