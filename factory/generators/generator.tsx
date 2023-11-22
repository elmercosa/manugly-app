"use client";
import {
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useBusiness } from "@/app/contexts/business/context";
import { ParamsType, useParameters } from "@/app/contexts/parameter/context";
import { Parameters } from "@/factory/types/parameters";
import { paramService } from "@/services/paramService";

export default function Generator() {
  const { state } = useBusiness();
  const paramsContext = useParameters();

  const parameters = Parameters.getInstance().getParameters();
  const [enableQuery, setEnableQuery] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => paramService.getAllParams(state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const onChange = (key: any) => {
    if (parameters[key]) {
      let index = paramsContext.state.parameters.length;
      let parameter = {
        param: parameters[key],
        data: {
          id: null,
          key: null,
          title: null,
          type: key,
        },
        isValid: false,
        isValidated: false,
        isSaving: false,
        hasError: false,
        index: index,
      };
      paramsContext.dispatch({ type: "add", data: parameter });
    }
  };

  useEffect(() => {
    if (state.business.id !== "") {
      setEnableQuery(true);
    }
  }, [state.business.id]);

  useEffect(() => {
    if (data && !isLoading) {
      let params: ParamsType[] = [];
      data.forEach((param: any, index: any) => {
        if (parameters[param.type]) {
          let parameter = {
            param: parameters[param.type],
            data: param,
            isValid: true,
            isValidated: false,
            isSaving: false,
            hasError: false,
            index: index,
          };
          params.push(parameter);
        }
      });
      paramsContext.dispatch({ type: "set", data: params });
    }
  }, [data, isLoading]);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between w-full gap-4">
        <h2 className="text-3xl font-semibold">Parámetros del usuario</h2>
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="font-semibold text-white bg-manugly rounded-xl"
                startContent={<IconPlus size={20} className="font-semibold" />}
                isDisabled={isLoading}
              >
                Añadir parámetro
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
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
          <CircularProgress aria-label="Loading..." />
          <span>Cargando...</span>
        </div>
      )}

      <div className="grid w-full h-full grid-cols-3 gap-4">
        {!isLoading &&
          paramsContext.state.parameters.map((parameter: any, index: any) => {
            return (
              <parameter.param.configuration
                key={index}
                index={index}
                paramData={parameter.data}
              />
            );
          })}
      </div>
    </div>
  );
}
