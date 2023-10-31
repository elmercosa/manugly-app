"use client";

import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RadioGroup,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useBusiness } from "@/app/contexts/business/context";
import CustomRadio from "@/components/custom/custom-radio";
import { Loader } from "@/components/loader";
import { businessService } from "@/services/businessService";

export default function BusinessSelector({ user }: { user: any }) {
  const { state, dispatch } = useBusiness();

  const [isOpen, setIsOpen] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const [business, setBusiness] = useState();
  const [showForm, setShowForm] = useState(false);
  const [isBusinessSelected, setIsBusinessSelected] = useState(false);

  // create business
  const ownerId = user.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [colour, setColour] = useState("red");
  const [loading, setLoading] = useState(false);

  //fetch businesses
  const { isLoading, data } = useQuery({
    queryKey: ["business", user.id],
    queryFn: () => businessService.getBusiness(user.id),
    retry: false,
  });

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

  useEffect(() => {
    if (state.business.id !== "") {
      setIsOpen(false);
      setIsBusinessSelected(true);
    }
  }, [state]);

  useEffect(() => {
    if (data) {
      setBusinesses(data);
      if (!data.length) {
        setShowForm(true);
      }
    }
  }, [data]);

  useEffect(() => {
    if (business) {
      dispatch({ type: "set", data: business });
      setIsOpen(false);
      window.location.reload();
    }
  }, [business]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-500 text-white rounded-full p-2"
      >
        {state.business.name}
      </Button>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        hideCloseButton={!isBusinessSelected}
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-xl">
            {showForm ? "Crea tu negocio" : "Selecciona un negocio"}
          </ModalHeader>
          <ModalBody>
            <Loader isLoading={isLoading}>
              {!showForm ? (
                <RadioGroup
                  description={
                    <span>
                      ¿Quieres crear un nuevo negocio? Puedes hacerlo{" "}
                      <Link
                        className="text-xs cursor-pointer"
                        onClick={() => setShowForm(true)}
                      >
                        aquí
                      </Link>
                    </span>
                  }
                  value={business}
                  onValueChange={(value: any) => setBusiness(value)}
                >
                  {businesses.map((business: any) => (
                    <CustomRadio value={business} key={business.id}>
                      {business.name}
                    </CustomRadio>
                  ))}
                </RadioGroup>
              ) : (
                <>
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
                </>
              )}
            </Loader>
          </ModalBody>
          {showForm && (
            <ModalFooter>
              {businesses.length > 0 && (
                <Button
                  className="shadow-md rounded-xl"
                  color="danger"
                  variant="flat"
                  onClick={() => setShowForm(false)}
                  isLoading={loading}
                >
                  Atrás
                </Button>
              )}
              <Button
                className="text-white shadow-md bg-emerald-500 rounded-xl"
                onClick={createBusiness}
                isLoading={loading}
              >
                Crear negocio
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
