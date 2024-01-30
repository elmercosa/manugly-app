"use client";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useBusiness } from "@/app/contexts/business/context";
import entityService from "@/services/entityService";

import useDataQuery from "../../../hooks/useDataQuery";
import useEnableQuery from "../../../hooks/useEnableQuery";
import CalendarForm from "./calendarForm";

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [week, setWeek] = useState([] as any);
  const [rows, setRows] = useState([] as any);
  const [currentMonth, setCurrentMonth] = useState("");
  const [cellDates, setCellDates] = useState([] as any[]);

  const [slotTypeId, setSlotTypeId] = useState([] as any);
  const [employeeId, setEmployeeId] = useState([] as any);

  const [slotsList, setSlotsList] = useState([] as any[]);

  const BusinessContext = useBusiness();

  const enableSlotsQuery = useEnableQuery(BusinessContext.state.business.id);
  const GetSlots = useQuery({
    queryKey: "get-slotsasdasd",
    queryFn: () =>
      entityService("slots").getAll(BusinessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableSlotsQuery,
  });
  const slots = useDataQuery(BusinessContext.state.business.id, GetSlots);

  const enableUsersQuery = useEnableQuery(BusinessContext.state.business.id);
  const GetUsers = useQuery({
    queryKey: "get-users",
    queryFn: () =>
      entityService("users").getAll(BusinessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableUsersQuery,
  });
  const users = useDataQuery(BusinessContext.state.business.id, GetUsers);

  const enableEmployeesQuery = useEnableQuery(
    BusinessContext.state.business.id,
  );
  const GetEmployees = useQuery({
    queryKey: "get-employees",
    queryFn: () =>
      entityService("employees").getAll(BusinessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableEmployeesQuery,
  });
  const employees = useDataQuery(
    BusinessContext.state.business.id,
    GetEmployees,
  );

  const enableSlotTypesQuery = useEnableQuery(
    BusinessContext.state.business.id,
  );
  const GetSlotTypes = useQuery({
    queryKey: "get-slot-types",
    queryFn: () =>
      entityService("slots/types").getAll(BusinessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableSlotTypesQuery,
  });
  const slotTypes = useDataQuery(
    BusinessContext.state.business.id,
    GetSlotTypes,
  );

  const calculateWeek = () => {
    const currentDayOfWeek = date.getDay();
    const currentDayOfMonth = date.getDate();
    const currentMonth = date.getMonth();
    const firstDate = currentDayOfMonth - currentDayOfWeek + 1;
    const lastDate = firstDate + 6;

    let maxDate = 31;
    if (currentMonth == 1) {
      maxDate = 28;
    } else if ([3, 5, 8, 10].includes(currentMonth)) {
      maxDate = 30;
    }

    let cellDates: any[] = [];

    let week = [];
    for (let i = firstDate; i <= lastDate; i++) {
      if (i > maxDate) {
        week.push(i - maxDate);
        if (currentMonth == 11) {
          cellDates[i - maxDate] = {
            day: i - maxDate,
            month: currentMonth + 1 - 12,
            year: date.getFullYear() + 1,
            date: new Date(date.getFullYear() + 1, 0, i - maxDate),
          };
        } else {
          cellDates[i - maxDate] = {
            day: i - maxDate,
            month: currentMonth + 1,
            year: date.getFullYear(),
            date: new Date(date.getFullYear(), currentMonth + 1, i - maxDate),
          };
        }
      } else {
        week.push(i);
        cellDates[i] = {
          day: i,
          month: currentMonth,
          year: date.getFullYear(),
          date: new Date(date.getFullYear(), currentMonth, i),
        };
      }
    }
    console.log("cellDates :>> ", cellDates);
    setCellDates(cellDates);
    setWeek(week);
  };

  const calculateRows = () => {
    let rows = [];
    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : i;
      const nexHour = i + 1 < 10 ? `0${i + 1}` : i + 1;
      const firstHalf = { startDate: hour + ":00", endDate: hour + ":30" };
      const secondHalf = { startDate: hour + ":30", endDate: nexHour + ":00" };
      rows.push(firstHalf);
      rows.push(secondHalf);
    }
    setRows(rows);
  };

  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  useEffect(() => {
    calculateWeek();
    calculateRows();
    setCurrentMonth(date.toLocaleString("default", { month: "long" }));
  }, [date]);

  const findSlots = (day: any, row: any) => {
    const date = cellDates[day];
    const startHours = row.startDate.split(":");
    const endHours = row.endDate.split(":");
    const dateStart = new Date(
      new Date(date.date).setHours(parseInt(startHours[0]), startHours[1], 0),
    );
    const dateEnd = new Date(
      new Date(date.date).setHours(parseInt(endHours[0]), endHours[1], 0),
    );
    let slot = slotsList?.filter((slot: any) => {
      let start = slot.start.replace("Z", "");
      let end = slot.end.replace("Z", "");
      return new Date(start) >= dateStart && new Date(end) <= dateEnd;
    });

    return slot;
  };

  useEffect(() => {
    if (slots) {
      setSlotsList(slots);
    }
  }, [slots]);

  useEffect(() => {
    let slotId = [...slotTypeId][0];
    let employeId = [...employeeId][0];
    let slotsAux = slots;
    if (slotId !== undefined) {
      slotsAux = slotsAux.filter((slot: any) => {
        return slotId.includes(slot.slotTypeId);
      });
    }
    if (employeId !== undefined) {
      slotsAux = slotsAux.filter((slot: any) => {
        return employeId.includes(slot.employeeId);
      });
    }
    setSlotsList(slotsAux);
  }, [slotTypeId, employeeId, slots]);

  return (
    <div className="relative flex flex-col w-full gap-4">
      <div className="flex items-center justify-between h-12">
        <div className="w-1/3 text-2xl font-semibold">
          <span className="capitalize">{currentMonth}</span> de{" "}
          <span>{date.getFullYear()}</span>
        </div>
        <div className="flex items-center justify-end w-2/3 gap-2">
          <Select
            placeholder="Empleado"
            selectionMode="single"
            onSelectionChange={setEmployeeId}
            className="max-w-[10rem]"
            classNames={{
              trigger: "bg-white",
            }}
          >
            {employees.map((employee: any) => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            placeholder="Tipo de cita"
            selectionMode="single"
            onSelectionChange={setSlotTypeId}
            className="max-w-[10rem]"
            classNames={{
              trigger: "bg-white",
            }}
          >
            {slotTypes.map((slotType: any) => (
              <SelectItem key={slotType.id} value={slotType.id}>
                {slotType.name}
              </SelectItem>
            ))}
          </Select>
          <Button
            className="font-semibold text-white bg-manugly"
            onClick={() => setDate(new Date(date.setDate(date.getDate() - 7)))}
            isIconOnly
          >
            <IconArrowLeft />
          </Button>
          <Button
            className="font-semibold text-white bg-manugly"
            onClick={() => setDate(new Date())}
          >
            Hoy
          </Button>
          <Button
            className="font-semibold text-white bg-manugly"
            onClick={() => setDate(new Date(date.setDate(date.getDate() + 7)))}
            isIconOnly
          >
            <IconArrowRight />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col items-end w-full p-6 bg-white rounded-xl">
          <table className="w-full">
            <thead className="block pb-2">
              <tr className="sticky grid items-center grid-flow-col grid-cols-calendar-big auto-cols-max min-h-unit-3">
                <th></th>
                {week.map((day: any, index: number) => (
                  <th
                    key={"header-" + day}
                    className={`flex flex-col ${
                      day == currentDate.getDate() ? "text-primary" : ""
                    }`}
                  >
                    <span className="uppercase"> {dayNames[index]} </span>
                    <span> {day} </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any, index: number) => (
                <tr
                  key={"row-" + index}
                  className="grid items-center grid-flow-col grid-cols-calendar-big auto-cols-max min-h-unit-8"
                >
                  <td className="flex items-start justify-center h-full text-xs text-default-500">
                    {row.startDate}
                  </td>
                  {week.map((day: any, index: number) => (
                    <CalendarForm
                      employees={employees}
                      users={users}
                      key={"form-" + index}
                      day={day}
                      row={row}
                      index={index}
                      rows={rows}
                      date={cellDates[day]}
                      businessId={BusinessContext.state.business.id}
                      slotTypes={slotTypes}
                      findSlots={findSlots(day, row)}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
