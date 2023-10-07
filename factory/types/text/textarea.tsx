import { Checkbox, CheckboxGroup, Input, Textarea } from "@nextui-org/react";

import { ExportType } from "@/factory/types/interfaces";

export const name = "Texto Largo";

export function TextAreaCustom() {
  return (
    <Textarea
      name="text"
      id="text"
      placeholder="Texto largo"
      className="w-full rounded-lg"
    />
  );
}

export function Configuration() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">
        Configuración para parámetro de Texto largo
      </h2>
      <div className="flex gap-2">
        <Input type="text" name="name" label="Nombre del parámetro" />
        <Checkbox>¿Obligatorio?</Checkbox>
      </div>
      <div className="flex gap-2">
        <Input type="number" name="min" label="Numero minimo de lineas" />
        <Input type="number" name="max" label="Numero maximo de lineas" />
      </div>
    </div>
  );
}

export const Schema: ExportType = {
  name,
  component: TextAreaCustom,
  configuration: Configuration,
};
