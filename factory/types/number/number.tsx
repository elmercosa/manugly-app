import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";

import { ExportType } from "@/factory/types/interfaces";

const name = "Número";

export function Number() {
  return (
    <Input
      type="number"
      name="number"
      id="number"
      placeholder="Número"
      className="w-full rounded-lg"
    />
  );
}

export function Configuration() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-semibold">
        Configuración para parámetro de Número
      </h2>
      <div className="flex gap-2">
        <Input type="text" name="name" label="Nombre del parámetro" />
        <Checkbox>¿Obligatorio?</Checkbox>
      </div>
      <div className="flex gap-2">
        <Input type="number" name="max" label="Número maximo permitido" />
        <Input type="number" name="min" label="Número minimo permitido" />
      </div>
    </div>
  );
}

export const Schema: ExportType = {
  name,
  component: Number,
  configuration: Configuration,
};
