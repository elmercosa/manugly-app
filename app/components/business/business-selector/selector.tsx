"use client";

import {
  Button,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { businessAtom } from "@/app/store/store";
import { businessService } from "@/services/businessService";

export default function BusinessSelector(user: any) {
  const [business, setBusiness] = useAtom(businessAtom);
  const [isOpen, setIsOpen] = useState(true);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    if (business) {
      setIsOpen(false);
    }
  }, [business]);

  const { isLoading, data } = useQuery({
    queryKey: ["business", user.user.id],
    queryFn: () => businessService.getBusiness(user.user.id),
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setBusinesses(data);
    }
  }, [data]);

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton={true}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-xl">
            Selecciona un negocio para continuar
          </ModalHeader>
          <ModalBody>
            <RadioGroup
              label="Negocios"
              description="Podrás cambiar de negocio siempre que quieras"
              value={business}
              onValueChange={setBusiness}
            >
              {businesses.map((business: any) => (
                <CustomRadio value={business} key={business.id}>
                  {business.name}
                </CustomRadio>
              ))}
            </RadioGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content2 hover:bg-content3 items-center justify-between",
          "flex-row-reverse max-w-[1000px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary data-[selected=true]:bg-content1",
        ),
      }}
    >
      {children}
    </Radio>
  );
};
