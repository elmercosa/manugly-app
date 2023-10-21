import { Checkbox, CheckboxGroup, Chip, Input } from "@nextui-org/react";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { use, useEffect, useState } from "react";

import { businessAtom } from "@/app/store/store";
import { ExportType } from "@/factory/types/interfaces";
import { paramService } from "@/services/paramService";

export const name = "Texto corto";
export const type = "text";

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

export function Configuration({
  save,
  paramData,
}: {
  save?: any;
  paramData?: any;
}) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const type = "text";

  const [isSaved, setIsSaved] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);

  const [business, setBusiness] = useAtom(businessAtom);

  // Config
  const [max, setMax] = useState("3");
  const [specialChars, setSpecialChars] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [required, setRequired] = useState(false);

  const saveParam = async () => {
    const config = {
      max: max,
      specialChars: specialChars,
      numbers: numbers,
      required: required,
    };

    const key = title.toLowerCase().replace(/ /g, "_");
    const keyNormalized = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const param = {
      title: title,
      key: keyNormalized,
      type: type,
      config: JSON.stringify(config),
      businessId: business?.id,
    };
    const response = await paramService.createParam(param);

    if (response) {
      setId(response.id);
      setIsSaved(true);
      setErrorOnSave(false);
    } else {
      setErrorOnSave(true);
      setIsSaved(false);
    }
  };

  const updateParam = async () => {
    const config = {
      max: max,
      specialChars: specialChars,
      numbers: numbers,
      required: required,
    };

    const param = {
      config: JSON.stringify(config),
      businessId: business?.id,
      id: id,
    };
    const response = await paramService.editParam(param);

    if (response) {
      setIsSaved(true);
      setErrorOnSave(false);
    } else {
      setErrorOnSave(true);
      setIsSaved(false);
    }
  };

  useEffect(() => {
    if (save && !isSaved) {
      if (id === null) {
        saveParam();
      } else {
        updateParam();
      }
    }
  }, [save]);

  useEffect(() => {
    if (paramData) {
      setId(paramData.id);
      setTitle(paramData.title);
      if (paramData.config) {
        const config = JSON.parse(paramData.config);
        setMax(config.max);
        setSpecialChars(config.specialChars);
        setNumbers(config.numbers);
        setRequired(config.required);
      }
    }
  }, [paramData]);

  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-2xl font-semibold">Texto corto</h2>
      <div className="flex">
        <Input
          type="text"
          name="name"
          label="Nombre del parámetro"
          value={title}
          onValueChange={setTitle}
          readOnly={id !== null}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold">Configuración avanzada</h3>
        <div className="flex gap-2">
          <Input
            type="number"
            className="max-w-fit"
            name="max"
            label="Longitud máxima"
            variant="bordered"
            value={max}
            onValueChange={setMax}
            min={3}
          />
          <Checkbox isSelected={specialChars} onValueChange={setSpecialChars}>
            Permitir caracteres especiales
          </Checkbox>
          <Checkbox isSelected={numbers} onValueChange={setNumbers}>
            Permitir numeros
          </Checkbox>
          <Checkbox isSelected={required} onValueChange={setRequired}>
            ¿Obligatorio?
          </Checkbox>
        </div>
      </div>
      <div className="flex justify-end absolute bottom-0 right-0">
        {isSaved && (
          <Chip
            startContent={<IconCircleCheckFilled size={18} />}
            variant="faded"
            color="success"
          >
            Guardado
          </Chip>
        )}
        {errorOnSave && (
          <Chip
            startContent={<IconCircleXFilled size={18} />}
            variant="faded"
            color="danger"
          >
            Error al guardar
          </Chip>
        )}
      </div>
    </div>
  );
}

export const Schema: ExportType = {
  type: type,
  name,
  component: Text,
  configuration: Configuration,
};
