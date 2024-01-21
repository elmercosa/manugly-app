"use client";
import { Button } from "@nextui-org/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import CalendarForm from "./calendarForm";

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [week, setWeek] = useState([] as any);
  const [rows, setRows] = useState([] as any);
  const [currentMonth, setCurrentMonth] = useState("");
  const [cellDates, setCellDates] = useState([] as any[]);

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
  return (
    <div className="relative flex flex-col w-full max-h-screen gap-4">
      <div className="flex items-center justify-between h-12">
        <div className="text-2xl font-semibold ">
          <span className="capitalize">{currentMonth}</span> de{" "}
          <span>{date.getFullYear()}</span>
        </div>
        <div className="flex items-center gap-2">
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
      <div className="flex flex-wrap w-full max-h-[calc(100vh-6rem)]">
        <div className="flex flex-col items-end w-full p-6 bg-white rounded-xl">
          <table className="w-full ">
            <thead className="block pb-2">
              <tr className="sticky grid items-center grid-flow-col  grid-cols-calendar-big auto-cols-max min-h-unit-3">
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
            <tbody className="max-h-[calc(100vh-10rem)] overflow-y-auto">
              {rows.map((row: any, index: number) => (
                <tr
                  key={"row-" + index}
                  className="grid items-center grid-flow-col grid-cols-calendar-big auto-cols-max min-h-unit-8"
                >
                  <td className="text-xs text-center text-default-500">
                    {row.startDate}
                  </td>
                  {week.map((day: any, index: number) => (
                    <CalendarForm
                      key={"form-" + index}
                      day={day}
                      row={row}
                      index={index}
                      rows={rows}
                      date={cellDates[day]}
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
