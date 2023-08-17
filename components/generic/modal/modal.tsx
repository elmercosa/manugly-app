"use client";
import { Backdrop, ButtonColor } from "./modal.types";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export function CustomModal({
  children,
  backdrop = undefined,
  buttonColor = ButtonColor.Primary,
  title,
  buttonTitle,
}: {
  children?: React.ReactNode;
  backdrop?: Backdrop;
  title: string;
  buttonTitle: string;
  buttonColor?: ButtonColor;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          color={buttonColor}
          onPress={() => handleOpen()}
          className="text-white"
          radius="full"
        >
          {buttonTitle}
        </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl font-bold">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
