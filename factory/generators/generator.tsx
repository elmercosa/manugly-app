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
import { Key, use, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useBusiness } from "@/app/contexts/business/context";
import { Parameters } from "@/factory/types/parameters";
import { paramService } from "@/services/paramService";

interface ParameterType {
  param: any;
  data: any;
}

export default function Generator() {
  const { state } = useBusiness();

  const parameters = Parameters.getInstance().getParameters();
  const [params, setParams] = useState([] as ParameterType[]);
  const [save, setSave] = useState(false);
  const [enableQuery, setEnableQuery] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["users", state.business.id],
    queryFn: () => paramService.getAllParams(state.business.id ?? ""),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

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

  useEffect(() => {
    if (state.business.id !== "") {
      setEnableQuery(true);
    }
  }, [state.business.id]);

  useEffect(() => {
    if (data && !isLoading) {
      let params: ParameterType[] = [];
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
      <div className="flex w-full justify-between items-center gap-4 bg-white rounded-xl p-4 shadow-md">
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
