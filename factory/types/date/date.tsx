import { Chip, Input, Spinner, Switch } from "@nextui-org/react";
import {
  IconCalendarFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
} from "@tabler/icons-react";
import { use, useEffect, useState } from "react";

import { useParameters } from "@/app/contexts/parameter/context";
import { ExportType } from "@/factory/types/interfaces";
import { paramService } from "@/services/paramService";

import { ParamComponent, ParamConfiguration } from "../param";

const name = "Fecha";
const type = "date";

function DateCustom({
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
  const [value, setValue] = useState();
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
          paramsContext.dispatch({
            type: "setIsValid",
            index: index,
            isValid: true,
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
      errorMessage={config.required ? "Este valor es obligatorio" : ""}
      description=""
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
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [dateMax, setDateMax] = useState("");
  const [dateMin, setDateMin] = useState("");

  const [config, setConfig] = useState({});
  const [enableLimits, setEnableLimits] = useState(false);

  const makeConfig = () => {
    const configuration = {
      max: max,
      min: min,
      enableLimits: enableLimits,
    };
    setConfig(configuration);
  };

  useEffect(() => {
    if (
      paramData &&
      paramData.configuration &&
      paramData.configuration.length > 0
    ) {
      const config = JSON.parse(paramData.configuration[0].configuration);
      setMax(config.max);
      setMin(config.min);
      setEnableLimits(config.enableLimits);
      makeConfig();
      makeLimits();
    }
  }, [paramData]);

  useEffect(() => {
    makeConfig();
    makeLimits();
  }, [max, min]);

  const makeLimits = () => {
    if (max !== "") {
      let date = new Date(max);
      date.setDate(date.getDate() - 1);
      setDateMax(date.toISOString().split("T")[0]);
    }

    if (min !== "") {
      let date = new Date(min);
      date.setDate(date.getDate() + 1);
      setDateMin(date.toISOString().split("T")[0]);
    }
  };

  return (
    <ParamConfiguration
      save={save}
      data={paramData}
      config={config}
      type={type}
      paramTitle={name}
      index={index}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 w-full justify-between">
          <span className="text-sm">Limitar valores</span>
          <Switch
            size="sm"
            isSelected={enableLimits}
            onValueChange={setEnableLimits}
            aria-label="Limitar valores"
            classNames={{
              wrapper: "m-0",
            }}
          />
        </div>
        {enableLimits && (
          <>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">Fecha mínima</span>
              <Input
                type="date"
                value={min}
                onValueChange={setMin}
                size="sm"
                max={dateMax}
                classNames={{
                  inputWrapper:
                    "w-[9rem] max-w-[9rem] min-w-[9rem] p-1.5 h-fit",
                  base: "w-[9rem] max-w-[9rem] min-w-[9rem]",
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-2 ">
              <span className="text-sm">Fecha máxima</span>
              <Input
                type="date"
                value={max}
                onValueChange={setMax}
                min={dateMin}
                size="sm"
                classNames={{
                  inputWrapper:
                    "w-[9rem] max-w-[9rem] min-w-[9rem] p-1.5 h-fit",
                  base: "w-[9rem] max-w-[9rem] min-w-[9rem]",
                }}
              />
            </div>
          </>
        )}
      </div>
    </ParamConfiguration>
  );
}

export const Schema: ExportType = {
  type,
  name,
  component: DateCustom,
  configuration: Configuration,
};
