"use client";
import { Button, Input } from "@nextui-org/react";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import { userService } from "@/services/userService";

import { PageLoader } from "../pageLoader";

export default function AddUserForm() {
  const [name, setName] = useState("Elmer");
  const [surname, setSurname] = useState("Cortez");
  const [email, setEmail] = useState(`elmer${new Date().getTime()}@gmail.com`);
  const [idDocument, setIdDocument] = useState(`elmer${new Date().getTime()}`);
  const firstLogin = true;

  const [user, setUser] = useState({ id: "" });
  const [enableQuery, setEnableQuery] = useState(false);

  const businessContext = useBusiness();

  const { push } = useRouter();

  const { isLoading, data, isError, isFetched } = useQuery({
    queryKey: ["add-user", businessContext.state.business.id],
    queryFn: () =>
      userService.createUser(user, businessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const saveUser = async () => {
    setEnableQuery(true);
  };

  useEffect(() => {
    if (data && !isLoading && isFetched) {
      toast.success("Usuario creado correctamente");
      push(`/admin/users/parameters/${data.id}`);
    }

    if (isError) {
      toast.error("Ha ocurrido un error al crear el usuario");
    }
  }, [isLoading, data, isError, isFetched]);

  useEffect(() => {
    if (name && surname && email && idDocument) {
      const user = {
        id: "",
        name,
        surname,
        email,
        idDocument,
        firstLogin,
        password: idDocument,
      };
      setUser(user);
    }
  }, [name, surname, email, idDocument, firstLogin]);

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-full justify-end items-center">
        <Button
          className="bg-emerald-500 text-white"
          startContent={<IconDeviceFloppy size={20} />}
          onClick={saveUser}
          isLoading={enableQuery && isLoading}
        >
          Guardar
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex p-4 bg-white rounded-xl flex-col gap-2">
          <span className="text-xl font-semibold">
            Nombre del usuario
            <span className="text-red-500 font-semibold">*</span>
          </span>
          <Input
            type="text"
            value={name}
            onValueChange={setName}
            placeholder="Elmer"
            isRequired
            variant="bordered"
            size="sm"
          />
        </div>
        <div className="flex p-4 bg-white rounded-xl flex-col gap-2">
          <span className="text-xl font-semibold">
            Apellidos del usuario
            <span className="text-red-500 font-semibold">*</span>
          </span>
          <Input
            type="text"
            value={surname}
            onValueChange={setSurname}
            placeholder="Cortez"
            isRequired
            variant="bordered"
            size="sm"
          />
        </div>
        <div className="flex p-4 bg-white rounded-xl flex-col gap-2">
          <span className="text-xl font-semibold">
            Email del usuario
            <span className="text-red-500 font-semibold">*</span>
          </span>
          <Input
            type="email"
            value={email}
            onValueChange={setEmail}
            placeholder="elmer@cortez.com"
            isRequired
            variant="bordered"
            size="sm"
          />
        </div>
        <div className="flex p-4 bg-white rounded-xl flex-col gap-2">
          <span className="text-xl font-semibold">
            Número del documento de identificación del usuario
            <span className="text-red-500 font-semibold">*</span>
          </span>
          <Input
            type="text"
            value={idDocument}
            onValueChange={setIdDocument}
            placeholder="69696969XXX"
            isRequired
            variant="bordered"
            size="sm"
          />
        </div>
      </div>
      <PageLoader isLoading={isLoading} />
    </div>
  );
}
