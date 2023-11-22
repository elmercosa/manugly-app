import { Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { ExportType } from "@/factory/types/interfaces";
import { ParamComponent, ParamConfiguration } from "@/factory/types/param";

const name = "Texto corto";
const type = "text";

function Text({
  save,
  paramData,
  userId,
  index,
}: {
  save?: any;
  paramData?: any;
  userId?: any;
  index?: any;
}) {
  const [config, setConfig] = useState({} as any);

  const validateParam = (value: any, config: any) => {
    setConfig(config);
    if (typeof value == "string") {
      let max = parseInt(config.max);
      if (value.length > max) {
        return false;
      }
      let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (!config.specialChars && specialChars.test(value)) {
        return false;
      }

      let hasNumber = /\d/;
      if (!config.numbers && hasNumber.test(value)) {
        return false;
      }

      if (value == "" && config.required) {
        return false;
      }

      return true;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (
      paramData &&
      paramData.configuration &&
      paramData.configuration.length
    ) {
      const config = JSON.parse(paramData.configuration[0].configuration);
      setConfig(config);
    }
  }, [paramData]);
  return (
    <ParamComponent
      save={save}
      data={paramData}
      type={type}
      paramTitle={name}
      index={index}
      userId={userId}
      validateParam={validateParam}
      errorMessage={`Este valor ${config.required ? "es obligatorio" : ""}${
        config.specialChars ? "" : ", no puede contener caracteres especiales"
      }
      ${config.specialChars ? "" : ", no puede contener números"} 
      y debe tener como máximo ${config.max} caracteres`}
      description={`Este valor ${config.required ? "es obligatorio" : ""}${
        config.specialChars ? "" : ", no puede contener caracteres especiales"
      }
      ${config.specialChars ? "" : ", no puede contener números"} 
      y debe tener como máximo ${config.max} caracteres`}
    >
      <></>
    </ParamComponent>
  );
}

function Configuration({ paramData, index }: { paramData?: any; index?: any }) {
  // Config
  const [max, setMax] = useState("3");
  const [specialChars, setSpecialChars] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [config, setConfig] = useState({});

  const makeConfig = () => {
    const configuration = {
      max: max,
      specialChars: specialChars,
      numbers: numbers,
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
      makeConfig();
    }
  }, [paramData]);

  useEffect(() => {
    makeConfig();
  }, [max, specialChars, numbers]);

  return (
    <ParamConfiguration
      data={paramData}
      config={config}
      type={type}
      paramTitle={name}
      index={index}
    >
      <div className="flex items-center justify-between w-full gap-2">
        <span className="text-sm">Permitir caracteres especiales</span>
        <Switch
          size="sm"
          isSelected={specialChars}
          onValueChange={setSpecialChars}
          aria-label="Permitir caracteres especiales"
          classNames={{
            wrapper: "m-0",
          }}
        />
      </div>

      <div className="flex items-center justify-between w-full gap-2">
        <span className="text-sm">Permitir números</span>
        <Switch
          size="sm"
          isSelected={numbers}
          onValueChange={setNumbers}
          aria-label="Permitir números"
          classNames={{
            wrapper: "m-0",
          }}
        />
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
