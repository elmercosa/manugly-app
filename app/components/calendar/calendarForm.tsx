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
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function CalendarForm({
  index,
  day,
  row,
  rows,
  date,
}: {
  index: any;
  day: any;
  row: any;
  rows: any;
  date: any;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    // console.log("startTime :>> ", startTime);
    // console.log("endTime :>> ", endTime);
  }, [startTime, endTime]);
  return (
    <Popover key={index} showArrow={true} placement="right">
      <PopoverTrigger className="transition-background aria-expanded:scale-100 aria-expanded:opacity-100 aria-expanded:bg-primary/50 hover:bg-primary/50">
        <td
          key={"td-" + day}
          className={`cursor-pointer h-full border-default-200 border-t border-l last:border-r ${
            rows.length - 1 == index ? "border-b" : ""
          }`}
        ></td>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2 p-2">
          <h2 className="ml-2 text-xl font-semibold">Cita</h2>
          <div className="flex flex-col gap-2">
            <Input
              label="Título de la cita"
              type="text"
              value={title}
              onValueChange={setTitle}
              placeholder="Elmer"
              isRequired
              variant="bordered"
              size="sm"
            />
            <Textarea
              label="Descripción de la cita"
              type="text"
              value={description}
              onValueChange={setDescription}
              placeholder="Cortez"
              isRequired
              variant="bordered"
              size="sm"
              maxRows={3}
            />
            <Input
              label="Dia de la cita"
              type="text"
              value={date.date.toLocaleString("en-GB").split(",")[0]}
              placeholder="Elmer"
              isRequired
              variant="bordered"
              size="sm"
              isReadOnly
            />
            <Select
              variant="bordered"
              placeholder="Hora de inicio"
              onChange={(event) => {
                setStartTime(event.target.value);
              }}
            >
              {rows.map((row: any) => (
                <SelectItem
                  key={"start-" + row.startDate}
                  value={row.startDate}
                >
                  {row.startDate}
                </SelectItem>
              ))}
            </Select>
            <Select
              variant="bordered"
              placeholder="Hora de fin"
              onChange={(event) => {
                setEndTime(event.target.value);
              }}
            >
              {rows.map((row: any) => (
                <SelectItem key={"end-" + row.endDate} value={row.endDate}>
                  {row.endDate}
                </SelectItem>
              ))}
            </Select>
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
