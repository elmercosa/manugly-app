"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";

import Generator from "@/factory/generators/generator";

export default function CreateTemplate() {
  return (
    <div className="flex flex-col w-full gap-6 pb-10 h-full">
      <div className="flex flex-col gap-4 bg-white rounded-xl p-5 shadow-md">
        <h2 className="text-xl font-semibold">Datos de la plantilla</h2>
        <Input
          placeholder="Plantilla para..."
          type="text"
          label="Nombre de la plantilla"
          labelPlacement="outside"
        />
        <Textarea
          label="Descripción"
          labelPlacement="outside"
          placeholder="Enter your description"
        />
      </div>
      <div className="flex flex-col gap-4 bg-white rounded-xl p-5 shadow-md">
        <h2 className="text-xl font-semibold">Parámetros de la plantilla</h2>
        <Generator></Generator>
      </div>
    </div>
  );
}
