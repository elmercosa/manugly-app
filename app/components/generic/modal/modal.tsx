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

interface CustomModalProps {
  children?: React.ReactNode;
  backdrop?: Backdrop;
  title: string;
  buttonTitle: string;
  buttonColor?: ButtonColor;
  className?: string;
  showFooter: boolean;
}

export function CustomModal(props: CustomModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          onPress={() => handleOpen()}
          className="text-white gradient shadow-md"
          radius="lg"
        >
          {props.buttonTitle}
        </Button>
      </div>
      <Modal
        size="lg"
        backdrop={props.backdrop}
        isOpen={isOpen}
        onClose={onClose}
        className={props.className}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl font-bold">
                {props.title}
              </ModalHeader>
              <ModalBody>{props.children}</ModalBody>
              {props.showFooter && <ModalFooter></ModalFooter>}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
