"use client";

import { Button, Input } from "@nextui-org/react";
import { IconDeviceFloppy } from "@tabler/icons-react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { businessAtom } from "@/app/store/store";
import Setter from "@/factory/generators/setter";
import { userService } from "@/services/userService";

export default function AddUser() {
  const [name, setName] = useState("Elmer");
  const [surname, setSurname] = useState("Cortez");
  const [email, setEmail] = useState(`elmer${new Date().getTime()}@gmail.com`);
  const [idDocument, setIdDocument] = useState("69696969xxx");
  const firstLogin = true;
  const [isLoading, setIsLoading] = useState(false);
  const [business, setBusiness] = useAtom(businessAtom);
  const businessId = Cookies.get("businessId");

  // const { isLoading, data } = useQuery({
  //   queryKey: ["users", businessId],
  //   queryFn: () => paramService.getAllParams(businessId),
  //   retry: false,
  //   refetchOnWindowFocus: false,
  // });

  const { push } = useRouter();

  const saveUser = async () => {
    setIsLoading(true);
    const user = {
      name,
      surname,
      email,
      idDocument,
      firstLogin,
      password: idDocument,
    };
    const response = await userService.createUser(user, businessId);
    if (response) {
      push(`/admin/users/parameters/${response.id}`);
    } else {
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <div className="flex w-full justify-between items-center gap-4 bg-white rounded-xl p-4 shadow-md">
        <h2 className="text-3xl font-semibold">Datos del usuario</h2>
        <div className="flex gap-2">
          <Button
            className="bg-emerald-500 text-white shadow-md"
            startContent={<IconDeviceFloppy size={20} />}
            onClick={saveUser}
            isDisabled={isLoading}
          >
            Guardar
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full justify-between items-center gap-4 bg-white rounded-xl p-4 shadow-md">
        <Input
          type="text"
          value={name}
          onValueChange={setName}
          label="Nombre del usuario"
          placeholder="Elmer"
          isRequired
          labelPlacement="outside"
        />
        <Input
          type="text"
          value={surname}
          onValueChange={setSurname}
          label="Apellidos del usuario"
          placeholder="Cortez"
          isRequired
          labelPlacement="outside"
        />
        <Input
          type="email"
          value={email}
          onValueChange={setEmail}
          label="Email del usuario"
          placeholder="elmer@cortez.com"
          isRequired
          labelPlacement="outside"
        />
        <Input
          type="text"
          value={idDocument}
          onValueChange={setIdDocument}
          label="Número del documento de identificación del usuario"
          placeholder="69696969XXX"
          isRequired
          labelPlacement="outside"
        />
      </div>
    </div>
  );
}
