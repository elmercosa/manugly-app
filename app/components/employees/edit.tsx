"use client";
import { Button, Input, Skeleton } from "@nextui-org/react";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { use, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useParameters } from "@/app/contexts/parameter/context";
import Setter from "@/factory/generators/setter";
import entityService from "@/services/entityService";
import { userService } from "@/services/userService";

import { PageLoader } from "../pageLoader";

export default function EditEmployee({ userId }: { userId: string }) {
  const [save, setSave] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [idDocument, setIdDocument] = useState("");

  const [enableEdit, setEnableEdit] = useState(false);

  const paramsContext = useParameters();

  const GetUser = useQuery({
    queryKey: "get-employee",
    queryFn: () => entityService("employees").get(userId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const EditUser = useQuery({
    queryKey: "edit-employee",
    queryFn: () =>
      entityService("employees").edit({
        id: userId,
        name,
        surname,
        email,
        idDocument,
      }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableEdit,
  });

  const checkParamsValid = () => {
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

    return validParams.length === paramsContext.state.parameters.length;
  };

  const saveUser = async () => {
    if (checkParamsValid()) {
      setSave(true);
      setEnableEdit(true);
      if (EditUser.isFetched) {
        EditUser.refetch();
      }
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

      if (!paramsSaving.length) {
        setSave(false);
      }
    }
  }, [paramsContext, save]);

  useEffect(() => {
    if (GetUser.data && !GetUser.isLoading && GetUser.isFetched) {
      const user = GetUser.data;
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
      setIdDocument(user.idDocument);
    }

    if (GetUser.isError) {
      toast.error("Ha ocurrido un error al recuperar los datos del usuario");
    }
  }, [GetUser.data, GetUser.isLoading, GetUser.isFetched, GetUser.isError]);

  useEffect(() => {
    if (EditUser.data && !EditUser.isLoading && EditUser.isFetched) {
      toast.success("Se han guardado los datos del usuario");
    }

    if (EditUser.isError) {
      toast.error("Ha ocurrido un error al recuperar los datos del usuario");
    }
  }, [EditUser.data, EditUser.isLoading, EditUser.isFetched, EditUser.isError]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-semibold">Datos básicos del usuario</h2>
          <Button
            className="text-white bg-manugly"
            startContent={<IconDeviceFloppy size={20} />}
            onClick={saveUser}
          >
            Guardar
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 p-4 bg-white rounded-xl">
            <span className="text-xl font-semibold">
              Nombre del usuario
              <span className="font-semibold text-red-500">*</span>
            </span>
            <Skeleton isLoaded={GetUser.isFetched} className="rounded-lg">
              <Input
                type="text"
                value={name}
                onValueChange={setName}
                placeholder="Elmer"
                isRequired
                variant="bordered"
                size="sm"
              />
            </Skeleton>
          </div>
          <div className="flex flex-col gap-2 p-4 bg-white rounded-xl">
            <span className="text-xl font-semibold">
              Apellidos del usuario
              <span className="font-semibold text-red-500">*</span>
            </span>
            <Skeleton isLoaded={GetUser.isFetched} className="rounded-lg">
              <Input
                type="text"
                value={surname}
                onValueChange={setSurname}
                placeholder="Cortez"
                isRequired
                variant="bordered"
                size="sm"
              />
            </Skeleton>
          </div>
          <div className="flex flex-col gap-2 p-4 bg-white rounded-xl">
            <span className="text-xl font-semibold">
              Email del usuario
              <span className="font-semibold text-red-500">*</span>
            </span>
            <Skeleton isLoaded={GetUser.isFetched} className="rounded-lg">
              <Input
                type="email"
                value={email}
                onValueChange={setEmail}
                placeholder="elmer@cortez.com"
                isRequired
                variant="bordered"
                size="sm"
              />
            </Skeleton>
          </div>
          <div className="flex flex-col gap-2 p-4 bg-white rounded-xl">
            <span className="text-xl font-semibold">
              Número del documento de identificación del usuario
              <span className="font-semibold text-red-500">*</span>
            </span>
            <Skeleton isLoaded={GetUser.isFetched} className="rounded-lg">
              <Input
                type="text"
                value={idDocument}
                onValueChange={setIdDocument}
                placeholder="69696969XXX"
                isRequired
                variant="bordered"
                size="sm"
              />
            </Skeleton>
          </div>
        </div>
        <PageLoader isLoading={EditUser.isFetching} />
      </div>
      <Setter userId={userId} save={save} />
    </div>
  );
}
