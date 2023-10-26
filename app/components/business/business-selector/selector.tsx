"use client";

import {
  cn,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { Loader } from "@/components/generic/loader/loader";
import { businessService } from "@/services/businessService";

export default function BusinessSelector({
  user,
  isOpen,
  setIsOpen,
}: {
  user: any;
  isOpen: boolean;
  setIsOpen: any;
}) {
  const [businesses, setBusinesses] = useState([]);
  const [business, setBusiness] = useState();

  useEffect(() => {
    if (business) {
      // setIsOpen(false);
    }
  }, [business]);

  const { isLoading, data } = useQuery({
    queryKey: ["business", user.id],
    queryFn: () => businessService.getBusiness(user.id),
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
            <Loader isLoading={isLoading}>
              <RadioGroup
                description={
                  <span>
                    ¿Quieres crear un nuevo negocio? Puedes hacerlo{" "}
                    <Link href="/private?new-business" className="text-sm">
                      aquí
                    </Link>
                  </span>
                }
                value={business}
                onValueChange={setBusiness}
              >
                {businesses.map((business: any) => (
                  <CustomRadio value={business} key={business.id}>
                    {business.name}
                  </CustomRadio>
                ))}
              </RadioGroup>
            </Loader>
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
