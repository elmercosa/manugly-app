"use client";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { feedbackService } from "@/services/feedbackService";

export default function FeedBack({ session }: { session: any }) {
  const [value, setValue] = useState("");
  const [enableQuery, setEnableQuery] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, data, isError, isFetched, refetch } = useQuery({
    queryKey: ["feedback"],
    queryFn: () =>
      feedbackService.sendFeedback({
        personId: session.user.email,
        content: value,
        role: "client",
      }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const saveUser = async () => {
    if (value.length > 0) {
      setEnableQuery(true);
      if (isFetched) {
        refetch();
      }
    }
  };

  useEffect(() => {
    if (data && !isLoading) {
      toast.success("¡Gracias por tu opinión!");
      setIsOpen(false);
      setValue("");
    }
    if (isError) {
      setIsOpen(false);
      toast.error("Ha ocurrido un error");
      setValue("");
    }
  }, [isLoading, data, isError]);

  return (
    <>
      <Button
        onPress={() => {
          setIsOpen(true);
        }}
        className="bg-white  rounded-xl p-4 font-bold"
      >
        Feedback
      </Button>
      <Modal isOpen={isOpen} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            ¡Tu opinión importa!
          </ModalHeader>
          <ModalBody>
            <Textarea
              autoFocus
              placeholder="Deja tu opinión, cualquier idea de mejorar es bienvenida"
              variant="bordered"
              value={value}
              onValueChange={setValue}
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-emerald-500 text-white rounded-xl p-4 font-semibold"
              onPress={saveUser}
              isLoading={enableQuery && isLoading}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}