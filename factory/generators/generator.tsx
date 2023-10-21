"use client";
import {
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { Key, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { businessAtom } from "@/app/store/store";
import { Parameters } from "@/factory/types/parameters";
import { paramService } from "@/services/paramService";

export default function Generator() {
  const parameters = Parameters.getInstance().getParameters();
  const [params, setParams] = useState([]);
  const [save, setSave] = useState(false);
  const [business, setBusiness] = useAtom(businessAtom);

  const onChange = (key: Key) => {
    if (parameters[key]) {
      let parameter = { param: parameters[key], data: null };
      params.push(parameter);
      setParams([...params]);
    }
  };
  const saveParams = () => {
    setSave(true);
    setTimeout(() => {
      setSave(false);
    }, 1000);
  };
  const { isLoading, data } = useQuery({
    queryKey: ["users", business?.id],
    queryFn: () => paramService.getAllParams(business?.id),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && !isLoading) {
      let params = [];
      data.forEach((param: any) => {
        if (parameters[param.type]) {
          let parameter = { param: parameters[param.type], data: param };
          params.push(parameter);
        }
      });
      setParams([...params]);
    }
  }, [data, isLoading]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex w-full justify-between items-center gap-4">
        <h2 className="text-3xl font-semibold">Parámetros del usuario</h2>
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="bg-emerald-500 text-white shadow-md"
                startContent={<IconPlus size={20} />}
                isDisabled={isLoading}
              >
                Añadir parametro
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Action event example" onAction={onChange}>
              {Object.values(parameters).map((parameter: any) => {
                return (
                  <DropdownItem key={parameter.type}>
                    {parameter.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
          <Button
            className="bg-emerald-500 text-white shadow-md"
            startContent={<IconDeviceFloppy size={20} />}
            onClick={saveParams}
            isDisabled={isLoading}
          >
            Guardar
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 h-full">
        {isLoading && (
          <div className="flex flex-col gap-2 items-center justify-center w-full h-full ">
            <CircularProgress aria-label="Loading..." />
            <span>Cargando...</span>
          </div>
        )}
        {Object.values(params).map((parameter: any, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 w-full"
            >
              <parameter.param.configuration
                save={save}
                paramData={parameter.data}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
