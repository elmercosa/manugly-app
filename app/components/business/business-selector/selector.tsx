"use client";

import {
  Button,
  Input,
  Link,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useBusiness } from "@/app/contexts/business/context";
import { businessService } from "@/services/businessService";

export default function BusinessSelector({ user }: { user: any }) {
  const router = useRouter();

  const [businesses, setBusinesses] = useState([]);
  const [business, setBusiness] = useState();
  const [showForm, setShowForm] = useState(false);

  const [saveBusiness, setSaveBusiness] = useState(false);

  // business data
  const ownerId = user.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [colour, setColour] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const businessContext = useBusiness();

  //fetch businesses
  const getBusiness = useQuery({
    queryKey: ["get-business"],
    queryFn: () => businessService.getBusiness(user.id),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // create business
  const createBusiness = useQuery({
    queryKey: ["create-business"],
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

  const handleChange = (values: any) => {
    const [first] = values;
    const business = businesses.find((b: any) => b.id === first);
    setBusiness(business);
  };

  const handleContinue = () => {
    businessContext.dispatch({ type: "set", data: business });
    setIsLoading(true);
    router.replace(`/admin`);
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
      setBusiness(business as any);
    }
  }, [name, email, address, phone, colour, ownerId]);

  useEffect(() => {
    if (getBusiness.data) {
      setBusinesses(getBusiness.data);
      businessContext.dispatch({
        type: "setBusinesses",
        data: getBusiness.data,
      });
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

  const colors = [
    { name: "Azul", hexa: "#0724BC" },
    { name: "Verde", hexa: "#08C99B" },
    { name: "Naranja", hexa: "#EF5614" },
    { name: "Morado", hexa: "#8008C9" },
  ];

  const handleColorChange = (values: any) => {
    const [first] = values;
    console.log("first :>> ", first);
    setColour(first);
    // const business = businesses.find((b: any) => b.id === first);
    // setBusiness(business);
  };

  return (
    <div className="w-1/4">
      {!showForm ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <Select
            label={
              getBusiness.isLoading
                ? "Cargando negocios..."
                : "Selecciona un negocio"
            }
            className="max-w-xs"
            onSelectionChange={handleChange}
            disabled={getBusiness.isLoading}
          >
            {businesses.map((animal: any) => (
              <SelectItem key={animal.id} value={animal.id}>
                {animal.name}
              </SelectItem>
            ))}
          </Select>
          <span className="text-sm">
            Crea un nuevo negocio{" "}
            <Link
              className="text-sm font-semibold cursor-pointer"
              onClick={() => setShowForm(true)}
            >
              aquí
            </Link>
          </span>
          <Button
            className="text-white bg-manugly rounded-xl"
            endContent={<IconArrowRight size={18} />}
            onClick={handleContinue}
            isLoading={isLoading}
            isDisabled={business === undefined}
          >
            Continuar
          </Button>
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
              size="sm"
              isClearable
            />
            <Input
              type="text"
              label="Dirección del negocio"
              value={address}
              onValueChange={setAddress}
              isRequired={true}
              size="sm"
              isClearable
            />
            <Input
              type="tel"
              label="Número de teléfono del negocio"
              value={phone}
              onValueChange={setPhone}
              isRequired={true}
              size="sm"
              isClearable
            />
            <Select
              label="Selecciona un color para el negocio"
              onSelectionChange={handleColorChange}
            >
              {colors.map((color: any) => (
                <SelectItem
                  key={color.name}
                  value={color.hexa}
                  startContent={
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.hexa }}
                    ></div>
                  }
                >
                  {color.name}
                </SelectItem>
              ))}
            </Select>
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
              className="text-white shadow-md bg-manugly rounded-xl"
              onClick={save}
              isLoading={createBusiness.isLoading}
            >
              Crear negocio
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
