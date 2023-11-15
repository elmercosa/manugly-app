"use client";

import { Button, Input, Link, RadioGroup } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import CustomRadio from "@/components/custom/custom-radio";
import { Loader } from "@/components/loader";
import { businessService } from "@/services/businessService";

export default function BusinessSelector({ user }: { user: any }) {
  const { push } = useRouter();

  const [businesses, setBusinesses] = useState([]);
  const [business, setBusiness] = useState({} as any);
  const [showForm, setShowForm] = useState(false);
  const [isBusinessSelected, setIsBusinessSelected] = useState(false);

  const [saveBusiness, setSaveBusiness] = useState(false);

  // business data
  const ownerId = user.id;
  const [name, setName] = useState(`manugly-${new Date().getTime()}`);
  const [email, setEmail] = useState(
    `manugly-${new Date().getTime()}@gmail.com`,
  );
  const [address, setAddress] = useState("menugly");
  const [phone, setPhone] = useState("123456489");
  const [colour, setColour] = useState("#0C9668");

  const businessContext = useBusiness();

  //fetch businesses
  const getBusiness = useQuery({
    queryKey: ["get-business", user.id],
    queryFn: () => businessService.getBusiness(user.id),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // create business
  const createBusiness = useQuery({
    queryKey: ["create-business", user.id],
    queryFn: () => businessService.createBusiness(business),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: saveBusiness,
  });

  const save = () => {
    setSaveBusiness(true);
    if (createBusiness.isFetched) {
      createBusiness.refetch();
    }
  };

  useEffect(() => {
    if (name && email && address && phone) {
      const business = {
        name,
        email,
        address,
        phone,
        colour,
        ownerId,
      };
      setBusiness(business);
    }
  }, [name, email, address, phone, colour, ownerId]);

  useEffect(() => {
    if (businessContext.state.business.id !== "") {
      setIsBusinessSelected(true);
    }
  }, [businessContext.state]);

  useEffect(() => {
    if (getBusiness.data) {
      setBusinesses(getBusiness.data);
      if (!getBusiness.data.length) {
        setShowForm(true);
      }
    }
  }, [getBusiness.data]);

  useEffect(() => {
    if (createBusiness.data) {
      toast.success("Negocio creado correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [createBusiness.data]);

  useEffect(() => {
    if (business.id) {
      businessContext.dispatch({ type: "set", data: business });
      push(`/admin/`);
    }
  }, [business]);

  return (
    <Loader isLoading={getBusiness.isLoading}>
      <div className="w-1/3">
        {!showForm ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-semibold">Selecciona un negocio</h2>
            <RadioGroup
              className="w-full"
              description={
                <span className="text-base">
                  Crea un nuevo negocio{" "}
                  <Link
                    className="cursor-pointer"
                    onClick={() => setShowForm(true)}
                  >
                    aquí
                  </Link>
                </span>
              }
              value={business}
              onValueChange={(value: any) => setBusiness(value)}
            >
              <div className="grid w-full grid-cols-2 gap-2">
                {businesses.map((business: any) => (
                  <CustomRadio value={business} key={business.id}>
                    {business.name}
                  </CustomRadio>
                ))}
              </div>
            </RadioGroup>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <h2 className="text-xl font-semibold">Datos del negocio</h2>
            <div className="flex flex-col items-center justify-center w-full gap-4">
              <Input
                type="text"
                label="Nombre del negocio"
                value={name}
                onValueChange={setName}
                isRequired={true}
                variant="bordered"
                size="sm"
                autoFocus
                isClearable
              />
              <Input
                type="email"
                label="Email del negocio"
                value={email}
                onValueChange={setEmail}
                isRequired={true}
                variant="bordered"
                size="sm"
                isClearable
              />
              <Input
                type="text"
                label="Dirección del negocio"
                value={address}
                onValueChange={setAddress}
                isRequired={true}
                variant="bordered"
                size="sm"
                isClearable
              />
              <Input
                type="tel"
                label="Número de teléfono del negocio"
                value={phone}
                onValueChange={setPhone}
                isRequired={true}
                variant="bordered"
                size="sm"
                isClearable
              />
              <div className="flex items-center justify-between w-full px-3 py-2 transition-all border-2 rounded-lg hover:border-default-400">
                <span className="text-sm text-default-500">
                  Color para tu negocio
                  <span className="ml-1 text-red-500">*</span>
                </span>
                <input
                  type="color"
                  value={colour}
                  onChange={(event) => {
                    setColour(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-end w-full gap-4">
              {businesses.length > 0 && (
                <Button
                  className="shadow-md rounded-xl"
                  color="danger"
                  variant="flat"
                  onClick={() => setShowForm(false)}
                >
                  Atrás
                </Button>
              )}
              <Button
                className="text-white shadow-md bg-emerald-500 rounded-xl"
                onClick={save}
                isLoading={createBusiness.isLoading}
              >
                Crear negocio
              </Button>
            </div>
          </div>
        )}
      </div>
    </Loader>
  );
}
