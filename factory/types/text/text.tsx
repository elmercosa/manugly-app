import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";

import { ExportType } from "@/factory/types/interfaces";

export const name = "Texto corto";

export function Text() {
  return (
    <Input
      type="text"
      name="text"
      id="text"
      placeholder="Texto corto"
      className="w-full rounded-lg"
    />
  );
}

export function Configuration() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">
        Configuración para parámetro de Texto corto
      </h2>
      <div className="flex gap-2">
        <Input type="text" name="name" label="Nombre del parámetro" />
        <Input type="number" name="max" label="Numero maximo de caracteres" />
      </div>
      <div className="flex">
        <CheckboxGroup orientation="horizontal">
          <Checkbox value="buenos-aires">
            Permitir caracteres especiales
          </Checkbox>
          <Checkbox value="sydney">Permitir numeros</Checkbox>
          <Checkbox>¿Obligatorio?</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  );
}

export const Schema: ExportType = {
  name,
  component: Text,
  configuration: Configuration,
};
