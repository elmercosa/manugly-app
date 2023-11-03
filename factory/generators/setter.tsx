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

import { Parameters } from "@/factory/types/parameters";
import { paramService } from "@/services/paramService";

export default function Setter({
  userId,
  businessId,
}: {
  userId: any;
  businessId: any;
}) {
  const parameters = Parameters.getInstance().getParameters();
  const [params, setParams] = useState([]);

  const [save, setSave] = useState(false);

  const saveParams = () => {
    setSave(true);
    setTimeout(() => {
      setSave(false);
    }, 1000);
  };
  const { isLoading, data } = useQuery({
    queryKey: ["users", businessId],
    queryFn: () => paramService.getAllParams(businessId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && !isLoading) {
      let params: any[] = [];
      data.forEach((param: any) => {
        if (parameters[param.type]) {
          let parameter = { param: parameters[param.type], data: param };
          params.push(parameter);
        }
      });
      setParams(params);
    }
  }, [data, isLoading]);

  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <div className="flex w-full justify-between items-center gap-4 bg-white rounded-xl p-4 shadow-md">
        <h2 className="text-3xl font-semibold">Datos del usuario</h2>
        <div className="flex gap-2">
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
              <parameter.param.component
                save={save}
                paramData={parameter.data}
                businessId={businessId}
                userId={userId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
