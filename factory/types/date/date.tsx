import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";

import { ExportType } from "@/factory/types/interfaces";

export const name = "Fecha";

export function Date() {
  return (
    <Input
      type="date"
      name="date"
      id="date"
      placeholder=""
      className="w-full rounded-lg"
    />
  );
}

export function Configuration() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">
        Configuración para parámetro Fecha
      </h2>
      <div className="flex gap-2">
        <Input type="text" name="name" label="Nombre del parámetro" />
        <Checkbox>¿Obligatorio?</Checkbox>
      </div>
      <div className="flex gap-2">
        <Input
          type="date"
          name="max"
          label="Fecha maxima permitida"
          labelPlacement="outside"
          placeholder="fecha"
        />
        <Input
          type="date"
          name="min"
          label="Fecha minima permitida"
          labelPlacement="outside"
          placeholder="fecha"
        />
      </div>
    </div>
  );
}

export const Schema: ExportType = {
  name,
  component: Date,
  configuration: Configuration,
};
