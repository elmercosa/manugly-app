import { Input, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { ExportType } from "@/factory/types/interfaces";

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
  const [config, setConfig] = useState({} as any);

  const validateParam = (value: any, config: any) => {
    setConfig(config);
    if (typeof value == "string") {
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
      data={paramData}
      config={config}
      type={type}
      paramTitle={name}
      index={index}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full gap-2">
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
