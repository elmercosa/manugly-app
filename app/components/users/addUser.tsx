"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import { userService } from "@/services/userService";

export default function AddUserForm() {
  const [name, setName] = useState("Elmer");
  const [surname, setSurname] = useState("Cortez");
  const [email, setEmail] = useState(`elmer${new Date().getTime()}@gmail.com`);
  const [idDocument, setIdDocument] = useState(`elmer${new Date().getTime()}`);
  const firstLogin = true;

  const [user, setUser] = useState({ id: "" });
  const [enableQuery, setEnableQuery] = useState(false);

  const businessContext = useBusiness();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const queryClient = useQueryClient();

  const AddUser = useQuery({
    queryKey: ["add-user"],
    queryFn: () =>
      userService.createUser(user, businessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
    cacheTime: 0,
  });

  const saveUser = async () => {
    setEnableQuery(true);
  };

  useEffect(() => {
    if (AddUser.data && !AddUser.isLoading) {
      toast.success("Usuario creado correctamente");
      router.replace(`/admin/users/edit/${AddUser.data.id}`);
    }

    if (AddUser.isError) {
      toast.error("Ha ocurrido un error al crear el usuario");
    }
  }, [AddUser.isLoading, AddUser.data, AddUser.isError]);

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
    <>
      <Button
        onPress={onOpen}
        className="font-semibold text-white bg-manugly rounded-xl "
        startContent={<IconPlus size={20} className="font-semibold" />}
      >
        Añadir usuario
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear usuario
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 bg-white rounded-xl">
                    <span className="font-semibold ">
                      Nombre
                      <span className="font-semibold text-red-500">*</span>
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
                  <div className="flex flex-col gap-2 bg-white rounded-xl">
                    <span className="font-semibold ">
                      Apellidos
                      <span className="font-semibold text-red-500">*</span>
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
                  <div className="flex flex-col gap-2 bg-white rounded-xl">
                    <span className="font-semibold ">
                      Email
                      <span className="font-semibold text-red-500">*</span>
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
                  <div className="flex flex-col gap-2 bg-white rounded-xl">
                    <span className="font-semibold ">
                      Nº del documento de identificación
                      <span className="font-semibold text-red-500">*</span>
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
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white bg-manugly"
                  startContent={<IconDeviceFloppy size={20} />}
                  onClick={saveUser}
                  isLoading={enableQuery && AddUser.isLoading}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
