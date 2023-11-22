"use client";
import { Button, CircularProgress } from "@nextui-org/react";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import { ParamsType, useParameters } from "@/app/contexts/parameter/context";
import { PageLoader } from "@/components/pageLoader";
import { Parameters } from "@/factory/types/parameters";
import { paramService } from "@/services/paramService";

export default function Setter({
  userId,
  save,
}: {
  userId: string;
  save: boolean;
}) {
  const businessContext = useBusiness();
  const paramsContext = useParameters();

  const [paramsList, setParamsList] = useState([]);

  const parameters = Parameters.getInstance().getParameters();
  const [enableQuery, setEnableQuery] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const params = useQuery({
    queryKey: ["setter"],
    queryFn: () => paramService.getAllParams(businessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const paramsWithValues = useQuery({
    queryKey: ["setter-values"],
    queryFn: () =>
      paramService.getAllParamsWithValues(
        businessContext.state.business.id,
        userId,
      ),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

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
          const config = JSON.parse(param.configuration[0].configuration);
          let isValid = false;
          if (paramWithValue) {
            param.value = paramWithValue.userParameters[0].value;
            param.idValue = true;
            isValid = true;
          } else {
            param.value = null;
            param.idValue = null;
          }

          if (!config.required && !paramWithValue) {
            isValid = true;
          }

          if (param.type == "checkbox") {
            isValid = true;
          }

          let parameter = {
            param: parameters[param.type],
            data: param,
            isValid: isValid,
            isValidated: true,
            isSaving: false,
            hasError: false,
            index: index,
          };
          paramsAux.push(parameter);
        }
      });
      paramsContext.dispatch({ type: "set", data: paramsAux });
      setParamsList(paramsAux as any);
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
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-semibold">Parámetros del usuario</h2>
        </div>

        {params.isLoading && paramsWithValues.isLoading && (
          <div className="flex flex-col items-center justify-center w-full h-full gap-2">
            <CircularProgress aria-label="Loading..." />
            <span>Cargando...</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {!params.isLoading &&
            paramsList?.map((parameter: any, index: any) => {
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
