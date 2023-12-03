"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import entityService from "@/services/entityService";

export default function AddEmployeeRole() {
  const [name, setName] = useState("Elmer");
  const [description, setDescription] = useState("Cortez");

  const [user, setUser] = useState({ id: "" });
  const [enableQuery, setEnableQuery] = useState(false);

  const businessContext = useBusiness();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const AddUser = useQuery({
    queryKey: "add-role",
    queryFn: () => entityService("roles").create(user),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
    cacheTime: 0,
  });

  const saveUser = async () => {
    setEnableQuery(true);
    if (AddUser.isFetched) {
      AddUser.refetch();
    }
  };

  useEffect(() => {
    if (AddUser.data && !AddUser.isLoading) {
      toast.success("Empleado creado correctamente");
      router.replace(`/admin/employees/roles`);
    }

    if (AddUser.isError) {
      toast.error("Ha ocurrido un error al crear el rol");
    }
  }, [AddUser.isLoading, AddUser.data, AddUser.isError]);

  useEffect(() => {
    if (name && description && businessContext.state.business.id) {
      const user = {
        name,
        description,
        businessId: businessContext.state.business.id,
      };
      setUser(user as any);
    }
  }, [name, description, businessContext]);

  return (
    <>
      <Button
        onPress={onOpen}
        className="font-semibold text-white bg-manugly rounded-xl "
        startContent={<IconPlus size={20} className="font-semibold" />}
      >
        Añadir rol
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear rol
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
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 bg-white rounded-xl">
                    <span className="font-semibold ">
                      Nombre
                      <span className="font-semibold text-red-500">*</span>
                    </span>
                    <Textarea
                      value={description}
                      onValueChange={setDescription}
                      placeholder="Descripción"
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
