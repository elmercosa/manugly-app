import {
  Button,
  Input,
  Modal,
  modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import Setter from "@/factory/generators/setter";
import { userService } from "@/services/userService";

export default function LinkParametersForm({
  open,
  userId,
}: {
  open: boolean;
  userId: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalKey, setModalKey] = useState(123456789);

  useEffect(() => {
    if (open) {
      onOpen();
      setModalKey(new Date().getTime());
    }
  }, [open]);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      size="xl"
      scrollBehavior="inside"
      key={modalKey}
      classNames={{
        body: "bg-default-100",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Parámetros del usuario
            </ModalHeader>
            <Setter userId={userId} />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
