import { Chip, Input, Spinner, Switch } from "@nextui-org/react";
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconLetterCase,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useParameters } from "@/app/contexts/parameter/context";
import { ExportType } from "@/factory/types/interfaces";
import { ParamComponent, ParamConfiguration } from "@/factory/types/param";
import { paramService } from "@/services/paramService";

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
  const [config, setConfig] = useState({
    min: 0,
    max: 100,
    required: false,
    specialChars: false,
    numbers: false,
  });
  const [value, setValue] = useState("");
  const paramsContext = useParameters();
  useEffect(() => {
    if (paramsContext.state.parameters.length) {
      let param = paramsContext.state.parameters[index];
      let config = JSON.parse(param.data.configuration[0].configuration);
      setConfig(config);
      if (typeof param.data.value == "string") {
        let valueAux = param.data.value;
        if (valueAux !== value) {
          setValue(valueAux);
          let isValid = true;
          let max = parseInt(config.max);
          if (value.length > max) {
            isValid = false;
          }
          let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
          if (!config.specialChars && specialChars.test(value)) {
            isValid = false;
          }

          let hasNumber = /\d/;
          if (!config.numbers && hasNumber.test(value)) {
            isValid = false;
          }

          paramsContext.dispatch({
            type: "setIsValid",
            index: index,
            isValid: isValid,
          });
        }

        if (param.data.value == "" && config.required) {
          paramsContext.dispatch({
            type: "setIsValid",
            index: index,
            isValid: false,
          });
        }
      }
    }
  }, [paramsContext]);
  return (
    <ParamComponent
      save={save}
      data={paramData}
      config={null}
      type={type}
      paramTitle={name}
      index={index}
      userId={userId}
      errorMessage={`Este valor ${config.required ? "es obligatorio" : ""}${
        config.specialChars ? "" : ", no puede contener caracteres especiales"
      }
      ${config.specialChars ? "" : ", no puede contener números"} 
      debe tener como máximo ${config.max} caracteres`}
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
      save={save}
      data={paramData}
      config={config}
      type={type}
      paramTitle={name}
      index={index}
    >
      <div className="flex items-center gap-2 w-full justify-between">
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

      <div className="flex items-center gap-2 w-full justify-between">
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
