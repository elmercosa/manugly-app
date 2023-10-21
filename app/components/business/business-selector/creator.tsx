"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

import { businessService } from "@/services/businessService";

export default function BusinessCreator(user: any) {
  const ownerId = user.user.id;
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [colour, setColour] = useState("red");
  const [loading, setLoading] = useState(false);

  const createBusiness = async () => {
    if (name && email && address && phone) {
      setLoading(true);
      const business = {
        name,
        email,
        address,
        phone,
        colour,
        ownerId,
      };
      const response = await businessService.createBusiness(business);

      if (response) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton={true}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-xl">
            Crea tu primer negocio
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Nombre"
              placeholder="Nombre del negocio"
              value={name}
              onValueChange={setName}
            />
            <Input
              type="email"
              label="Email"
              placeholder="Email del negocio"
              value={email}
              onValueChange={setEmail}
            />
            <Input
              label="Dirección"
              placeholder="Dirección del negocio"
              value={address}
              onValueChange={setAddress}
            />
            <Input
              label="Teléfono"
              type="tel"
              placeholder="Teléfono del negocio"
              value={phone}
              onValueChange={setPhone}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-emerald-500 text-white shadow-md rounded-xl"
              onClick={createBusiness}
              isLoading={loading}
            >
              Crear negocio
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
