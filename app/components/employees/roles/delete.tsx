"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "@nextui-org/react";
import { IconTrashFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import entityService from "@/services/entityService";
import { userService } from "@/services/userService";

export default function DeleteEmployee({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteSlot, setDeleteSlot] = useState(false);

  const removeUser = useQuery({
    queryKey: "remove-employee",
    queryFn: () => entityService("employees").remove(id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: deleteSlot,
  });

  const handleRemoveSlot = (slot: any) => {
    setDeleteSlot(true);
  };

  useEffect(() => {
    if (removeUser.data && !removeUser.isLoading) {
      toast.success("Usuario eliminado correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }

    if (removeUser.isError) {
      toast.error("Error al eliminar el usuario");
    }
  }, [removeUser.data, removeUser.isError, removeUser.isLoading]);

  return (
    <>
      <Tooltip content="Borrar usuario" color="danger">
        <Button
          startContent={<IconTrashFilled size={16} />}
          onPress={() => setIsOpen(true)}
          size="sm"
          className="w-7 h-7 min-h-[28px] min-w-[28px]"
          isIconOnly
          color="danger"
          variant="flat"
        ></Button>
      </Tooltip>
      <Modal isOpen={isOpen} hideCloseButton={true}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-xl">
            ¿Estás seguro?
          </ModalHeader>
          <ModalBody>
            <p>Este parmámetro se eliminará y no podrás recuperarlo.</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsOpen(false)}
            >
              No
            </Button>
            <Button
              className="text-white shadow-md bg-manugly"
              onPress={handleRemoveSlot}
              isLoading={removeUser.isLoading}
            >
              Sí
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
