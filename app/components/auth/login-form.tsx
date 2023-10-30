"use client";

import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button, Checkbox, Divider } from "@nextui-org/react";
import {
  IconBrandGoogle,
  IconEye,
  IconEyeOff,
  IconShieldFilled,
} from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("borjarodrilore@gmail.com");
  const [password, setPassword] = useState("password-admin");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const login = (provider: string) => {
    setIsLoading(true);
    if (provider != "credentials") {
      signIn(provider);
    } else {
      signIn(provider, {
        email,
        password,
        callbackUrl: `${window.location.origin}/admin`,
      });
    }
  };
  return (
    <div className="flex flex-col w-[40%] gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-emerald-600">
          Accede a Manugly
        </h2>
        <p className="text-sm text-slate-500">
          Introduce tu email y tu contraseña para iniciar sesión
        </p>
      </div>
      <div className="flex justify-center w-full gap-4">
        <Button
          className="w-full font-bold transition-all shadow-md bg-emerald-50 text-slate-600 hover:bg-emerald-100"
          onClick={() => login("google")}
          isLoading={isLoading}
          startContent={<IconBrandGoogle size={18} stroke={4} />}
        >
          Google
        </Button>
        <Button
          className="w-full font-bold transition-all shadow-md bg-emerald-50 text-slate-600 hover:bg-emerald-100"
          onClick={() => login("auth0")}
          isLoading={isLoading}
          startContent={<IconShieldFilled size={18} stroke={4} />}
        >
          Auth0
        </Button>
      </div>
      <div className="relative w-full my-4">
        <Divider />
        <p className="absolute px-4 text-xs -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2">
          O inicia sesión con
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          label="Email"
          name="email"
          type="email"
          variant="bordered"
          value={email}
          onValueChange={setEmail}
        />
        <Input
          label="Contraseña"
          name="password"
          variant="bordered"
          value={password}
          onValueChange={setPassword}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IconEyeOff
                  className="pointer-events-none text-default-400"
                  size={20}
                />
              ) : (
                <IconEye
                  className="pointer-events-none text-default-400"
                  size={20}
                />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <div className="flex justify-between px-1">
          <Checkbox
            color="primary"
            classNames={{
              label: "text-small",
              icon: "text-white font-bold",
            }}
          >
            Recuerdame
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            ¿Olvidaste la contraseña?
          </Link>
        </div>
        <div className="flex flex-col justify-center w-full gap-4 mt-2">
          <Button
            className="w-full font-bold text-white transition-all duration-300 shadow-md ease-soft-spring bg-gradient-to-r bg-emerald-500 hover:text-white hover:bg-emerald-600"
            isLoading={isLoading}
            onClick={() => login("credentials")}
          >
            Acceder
          </Button>
          <p className="text-sm">
            ¿Todavía no estás registrado?{" "}
            <Link color="primary" href="#" size="sm">
              Crea tu cuenta aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
