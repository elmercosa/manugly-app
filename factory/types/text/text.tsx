import { Checkbox, Chip, Input, Spinner } from "@nextui-org/react";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { ExportType } from "@/factory/types/interfaces";
import { ParamConfiguration } from "@/factory/types/param";
import { paramService } from "@/services/paramService";

const name = "Texto corto";
const type = "text";

function Text({
  save,
  paramData,
  userId,
  businessId,
}: {
  save?: any;
  paramData?: any;
  userId?: any;
  businessId?: any;
}) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");

  const [isSaved, setIsSaved] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);
  const [saving, setSaving] = useState(false);

  // Config
  const [max, setMax] = useState("3");
  const [specialChars, setSpecialChars] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [required, setRequired] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // Value
  const [value, setValue] = useState("");

  const saveParam = async () => {
    setSaving(true);

    const param = {
      businessId: businessId,
      id: id,
      value: value,
      userId: userId,
    };
    const response = await paramService.linkParam(param);

    if (response) {
      setId(response.id);
      setIsSaved(true);
      setErrorOnSave(false);
    } else {
      setErrorOnSave(true);
      setIsSaved(false);
    }

    setSaving(false);
  };

  const updateParam = async () => {
    setSaving(true);

    const param = {
      businessId: businessId,
      id: id,
      value: value,
      userId: userId,
    };
    const response = await paramService.setValue(param);

    if (response) {
      setId(response.id);
      setIsSaved(true);
      setErrorOnSave(false);
    } else {
      setErrorOnSave(true);
      setIsSaved(false);
    }

    setSaving(false);
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
      // if (paramData.configuration && paramData.configuration.length > 0) {
      //   const config = JSON.parse(paramData.configuration[0].configuration);
      //   setMax(config.max);
      //   setSpecialChars(config.specialChars);
      //   setNumbers(config.numbers);
      //   setRequired(config.required);
      // }
    }
  }, [paramData]);

  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex">
        <Input
          type="text"
          label="Escribe aquí"
          value={value}
          onValueChange={setValue}
        />
      </div>
      <div className="flex justify-end absolute top-0 right-0">
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

        {saving && (
          <Chip
            startContent={
              <Spinner aria-label="Loading..." size="sm" className="text-xs" />
            }
            variant="faded"
            className="text-xs"
          >
            Guardando cambios...
          </Chip>
        )}
      </div>
    </div>
  );
}

function Configuration({
  save,
  paramData,
  index,
}: {
  save?: any;
  paramData?: any;
  index?: any;
}) {
  // Config
  const [max, setMax] = useState("3");
  const [specialChars, setSpecialChars] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [required, setRequired] = useState(false);
  const [config, setConfig] = useState({});

  const makeConfig = () => {
    const configuration = {
      max: max,
      specialChars: specialChars,
      numbers: numbers,
      required: required,
    };
    setConfig(configuration);
  };

  useEffect(() => {
    if (
      paramData &&
      paramData.configuration &&
      paramData.configuration.length
    ) {
      const config = JSON.parse(paramData.configuration[0].configuration);
      setMax(config.max);
      setSpecialChars(config.specialChars);
      setNumbers(config.numbers);
      setRequired(config.required);
      makeConfig();
    }
  }, [paramData]);

  useEffect(() => {
    makeConfig();
  }, [max, specialChars, numbers, required]);

  return (
    <ParamConfiguration
      save={save}
      data={paramData}
      config={config}
      type={type}
      paramTitle={name}
      index={index}
    >
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
    </ParamConfiguration>
  );
}

export const Schema: ExportType = {
  type,
  name,
  component: Text,
  configuration: Configuration,
};
