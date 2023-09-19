import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button, Divider } from "@nextui-org/react";
import { IconBrandGoogle, IconShieldFilled } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { CustomModal } from "@/components/generic/modal/modal";
import { Backdrop } from "@/components/generic/modal/modal.types";

export function ModalLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("borjarodrilore@gmail.com");
  const [password, setPassword] = useState("password-borja");
  const login = (provider: string) => {
    setIsLoading(true);
    if (provider != "credentials") {
      signIn(provider);
    } else {
      signIn(
        provider,
        {
          email,
          password,
        },
        { callbackUrl: "/private" },
      );
    }
  };
  return (
    <CustomModal
      backdrop={Backdrop.Opaque}
      title="Accede a Manugly"
      buttonTitle="Acceder"
      className="flex gap-4 p-2"
      showFooter={false}
    >
      <div className="flex flex-col gap-2">
        <Input
          label="Email"
          type="email"
          variant="bordered"
          color="primary"
          value={email}
          onValueChange={setEmail}
        />
        <Input
          label="Contraseña"
          type="password"
          variant="bordered"
          color="primary"
          value={password}
          onValueChange={setPassword}
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
        <div className="flex justify-center w-full gap-2 mt-2">
          <Button
            className="w-full font-semibold text-white transition-all shadow-md bg-gradient-to-r from-emerald-500 to-emerald-600 hover:text-white hover:from-emerald-600 hover:to-emerald-700"
            isLoading={isLoading}
            onClick={() => login("credentials")}
          >
            Acceder
          </Button>
          <Button
            className="w-full font-semibold text-white transition-all shadow-md bg-gradient-to-r from-emerald-400 to-emerald-500 hover:text-white hover:from-emerald-500 hover:to-emerald-600"
            isLoading={isLoading}
          >
            Registrarme
          </Button>
        </div>
      </div>
      <div className="relative w-full my-4">
        <Divider />
        <p className="absolute px-4 text-xs -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2">
          O inicia sesión con
        </p>
      </div>
      <div className="flex justify-center w-full gap-4">
        <Button
          className="text-emerald-600 font-semibold border-[2px] border-emerald-600 bg-gradient-to-r from-white to-white  shadow-md transition-all hover:border-emerald-500 hover:text-white hover:from-emerald-500 hover:to-emerald-600"
          onClick={() => login("google")}
          isLoading={isLoading}
          startContent={<IconBrandGoogle />}
        >
          Google
        </Button>
        <Button
          className="text-emerald-600 font-semibold border-[2px] border-emerald-600 bg-gradient-to-r from-white to-white  shadow-md transition-all hover:border-emerald-500 hover:text-white hover:from-emerald-500 hover:to-emerald-600"
          onClick={() => login("auth0")}
          isLoading={isLoading}
          startContent={<IconShieldFilled />}
        >
          Auth0
        </Button>
      </div>
    </CustomModal>
  );
}
