"use client";
import { Button, CircularProgress } from "@nextui-org/react";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import { ParamsType, useParameters } from "@/app/contexts/parameter/context";
import { PageLoader } from "@/components/pageLoader";
import { Parameters } from "@/factory/types/parameters";
import { paramService } from "@/services/paramService";

export default function Setter({ userId }: { userId: string }) {
  const businessContext = useBusiness();
  const paramsContext = useParameters();

  const parameters = Parameters.getInstance().getParameters();
  const [save, setSave] = useState(false);
  const [enableQuery, setEnableQuery] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const params = useQuery({
    queryKey: ["setter", businessContext.state.business.id],
    queryFn: () => paramService.getAllParams(businessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const paramsWithValues = useQuery({
    queryKey: ["setter-values", businessContext.state.business.id],
    queryFn: () =>
      paramService.getAllParamsWithValues(
        businessContext.state.business.id,
        userId,
      ),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const saveParams = () => {
    const validParams = paramsContext.state.parameters.filter(
      (param, index) => {
        let paramConfig = param.data.configuration[0];
        paramConfig = JSON.parse(paramConfig.configuration);

        if (!paramConfig.required) {
          return true;
        } else if (paramConfig.required && !param.data.value) {
          paramsContext.dispatch({
            type: "setIsValid",
            index: index,
            isValid: false,
          });
          return false;
        } else if (paramConfig.required && param.data.value) {
          return true;
        } else {
          return false;
        }
      },
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
    if (businessContext.state.business.id !== "") {
      setEnableQuery(true);
    }
  }, [businessContext.state.business.id]);

  useEffect(() => {
    if (
      params.data &&
      !params.isLoading &&
      paramsWithValues.data &&
      !paramsWithValues.isLoading
    ) {
      let paramsAux: ParamsType[] = [];
      params.data.forEach((param: any, index: any) => {
        if (parameters[param.type]) {
          let paramWithValue = findParam(param.id);
          if (paramWithValue) {
            param.value = paramWithValue.userParameters[0].value;
            param.idValue = true;
          } else {
            param.value = null;
            param.idValue = null;
          }
          let parameter = {
            param: parameters[param.type],
            data: param,
            isValid: true,
            isValidated: true,
            isSaving: false,
            hasError: false,
            index: index,
          };
          paramsAux.push(parameter);
        }
      });
      paramsContext.dispatch({ type: "set", data: paramsAux });
    }
  }, [
    params.data,
    params.isLoading,
    paramsWithValues.data,
    paramsWithValues.isLoading,
  ]);

  const findParam = (paramId: string) => {
    const param = paramsWithValues.data.find(
      (param: any) => param.id === paramId,
    );
    return param;
  };

  return (
    <>
      {enableQuery && !params.isLoading && (
        <div className="flex w-full justify-end items-center">
          <Button
            className="bg-emerald-500 text-white"
            startContent={<IconDeviceFloppy size={20} />}
            onClick={saveParams}
            isLoading={enableQuery && params.isLoading}
          >
            Guardar
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-6 h-full items-center bg-default-100">
        {params.isLoading && (
          <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
            <CircularProgress aria-label="Loading..." />
            <span>Cargando...</span>
          </div>
        )}

        <div className="flex flex-col w-full h-full gap-4 py-4">
          {!params.isLoading &&
            paramsContext.state.parameters.map((parameter: any, index: any) => {
              return (
                <parameter.param.component
                  key={index}
                  index={index}
                  save={save}
                  paramData={parameter.data}
                  userId={userId}
                />
              );
            })}
        </div>
        <PageLoader isLoading={isSaving} />
      </div>
    </>
  );
}
