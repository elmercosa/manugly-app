"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Key, ReactNode, useState } from "react";

import { Parameters } from "@/factory/types/parameters";

export default function Generator() {
  const parameters = Parameters.getInstance().getParameters();
  const [current, setCurrent] = useState([]);
  const onChange = (key: Key) => {
    const parameter = parameters[key];
    current.push(parameter);
    setCurrent([...current]);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between items-center gap-4">
        <Dropdown>
          <DropdownTrigger>
            <Button className="bg-emerald-500 text-white shadow-md">
              Seleccionar parametro
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Action event example" onAction={onChange}>
            {Object.values(parameters).map((parameter: any) => {
              return (
                <DropdownItem key={parameter.name}>
                  {parameter.name}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex flex-col w-full gap-6">
        {Object.values(current).map((parameter: any) => {
          return (
            <div key={parameter.name}>
              <parameter.configuration />
            </div>
          );
        })}
      </div>
    </div>
  );
}
