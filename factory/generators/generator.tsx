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
import { Key, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import { ParamsType, useParameters } from "@/app/contexts/parameter/context";
import { PageLoader } from "@/components/pageLoader";
import { Parameters } from "@/factory/types/parameters";
import { paramService } from "@/services/paramService";

export default function Generator() {
  const { state } = useBusiness();
  const paramsContext = useParameters();

  const parameters = Parameters.getInstance().getParameters();
  const [save, setSave] = useState(false);
  const [enableQuery, setEnableQuery] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["users", state.business.id],
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

  const saveParams = () => {
    const validParams = paramsContext.state.parameters.filter(
      (param) => param.isValid === true,
    );
    if (validParams.length === paramsContext.state.parameters.length) {
      setSave(true);
    } else {
      toast.error(
        "Se han encontrado errores en los parámetros.\n Por favor, revisa los campos marcados en rojo.",
      );
    }
  };

  useEffect(() => {
    if (paramsContext.state.parameters.length && save) {
      const paramsSaving = paramsContext.state.parameters.filter(
        (param) => param.isSaving === true,
      );

      if (paramsSaving.length && !isSaving) {
        setIsSaving(true);
      }

      if (!paramsSaving.length && isSaving) {
        const paramsWithError = paramsContext.state.parameters.filter(
          (param) => param.hasError === true,
        );

        if (paramsWithError.length) {
          toast.error(
            "Ha ocurrido un error al guardar.\n Por favor, revisa los campos marcados en rojo.",
          );
        } else {
          toast.success("Guardado correctamente!");
        }

        setIsSaving(false);
        setSave(false);
      }
    }
  }, [paramsContext, save]);

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
            isValid: false,
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

      {isLoading && (
        <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
          <CircularProgress aria-label="Loading..." />
          <span>Cargando...</span>
        </div>
      )}

      <div className="flex flex-col w-full h-full gap-4">
        {!isLoading &&
          paramsContext.state.parameters.map((parameter: any, index: any) => {
            return (
              <parameter.param.configuration
                key={index}
                index={index}
                save={save}
                paramData={parameter.data}
              />
            );
          })}
      </div>
      <PageLoader isLoading={isSaving} />
    </div>
  );
}
