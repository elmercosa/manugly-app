import { Checkbox, Input } from "@nextui-org/react";

import { ExportType } from "@/factory/types/interfaces";

const name = "Casilla";

export function CheckboxCustom() {
  return <Checkbox>Option</Checkbox>;
}

export function Configuration() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">
        Configuración para parámetro Casilla
      </h2>
      <div className="flex gap-2">
        <Input type="text" name="name" label="Nombre del parámetro" />
        <Checkbox>¿Marcado por defecto?</Checkbox>
        <Checkbox>¿Obligatorio?</Checkbox>
      </div>
    </div>
  );
}

export const Schema: ExportType = {
  name,
  component: CheckboxCustom,
  configuration: Configuration,
};
