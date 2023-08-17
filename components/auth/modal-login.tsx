import { CustomModal } from "@/components/generic/modal/modal";
import { Backdrop } from "@/components/generic/modal/modal.types";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button, Divider } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function ModalLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const login = (provider: string) => {
    setIsLoading(true);
    if (provider != "credentials") {
      signIn(provider);
    } else {
      signIn(provider);
    }
  };
  return (
    <CustomModal
      backdrop={Backdrop.Opaque}
      title="Inicia sesión"
      buttonTitle="Iniciar sesión"
    >
      <div className="flex flex-col gap-2">
        <Input
          autoFocus
          label="Email"
          placeholder="manugly@test.com"
          variant="bordered"
        />
        <Input
          label="Contraseña"
          placeholder="manuglyisthebest1234"
          type="password"
          variant="bordered"
        />
        <div className="flex justify-between px-1">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Recuerdame
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            ¿Olvidaste la contraseña?
          </Link>
        </div>
        <div className="flex w-full justify-between flex-col gap-2 mt-4">
          <Button
            color="primary"
            className="text-white font-semibold"
            isLoading={isLoading}
          >
            Acceder
          </Button>
          <Button
            color="primary"
            variant="ghost"
            className="text-primary font-semibold hover:text-white"
            isLoading={isLoading}
          >
            Registrarme
          </Button>
        </div>
      </div>
      <Divider className="mt-2" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs">O inicia sesión con</p>
        <div className="flex flex-col gap-2 w-full">
          <Button
            color="primary"
            variant="ghost"
            className="hover:text-white"
            onClick={() => login("google")}
            isLoading={isLoading}
          >
            Google
          </Button>
          <Button
            color="primary"
            variant="ghost"
            className="hover:text-white"
            onClick={() => login("auth0")}
            isLoading={isLoading}
          >
            Auth0
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}
