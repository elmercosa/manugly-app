"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";

export default function CreateTemplate() {
  return (
    <div className="flex flex-col w-full gap-6">
      <Card className="w-full shadow-md">
        <CardHeader className="pb-0 px-4 pt-4 flex-col items-start">
          <h2 className="text-xl font-semibold">Datos de la plantilla</h2>
        </CardHeader>
        <CardBody className="gap-4">
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
        </CardBody>
      </Card>
      <Card className="w-full shadow-md">
        <CardHeader className="pb-0 px-4 pt-4 flex-col items-start">
          <h2 className="text-xl font-semibold">Parámetros de la plantilla</h2>
        </CardHeader>
        <CardBody className="gap-4">
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
        </CardBody>
      </Card>
    </div>
  );
}
