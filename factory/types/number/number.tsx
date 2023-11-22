import { Input, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { ExportType } from "@/factory/types/interfaces";

import { ParamComponent, ParamConfiguration } from "../param";

const name = "Número";
const type = "number";

function Number({
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
      value = parseInt(value);
    }
    if (value != undefined) {
      let val = parseInt(value);
      if (isNaN(val) && config.required) {
        return false;
      }

      let max = parseInt(config.max);
      let min = parseInt(config.min);
      if (val < min || val > max) {
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
      errorMessage={`Este campo ${
        config.required ? "es obligatorio y" : ""
      } debe estar entre ${config.min} y ${config.max}`}
      description={`Este campo debe estar entre ${config.min} y ${config.max}`}
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
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const [config, setConfig] = useState({});

  const [enableLimits, setEnableLimits] = useState(false);

  const makeConfig = () => {
    const configuration = {
      max,
      min,
      enableLimits: enableLimits,
    };
    setConfig(configuration);
  };

  useEffect(() => {
    if (paramData) {
      if (paramData.configuration && paramData.configuration.length > 0) {
        const config = JSON.parse(paramData.configuration[0].configuration);
        setMax(config.max);
        setMin(config.min);
        setEnableLimits(config.enableLimits);
        makeConfig();
      }
    }
  }, [paramData]);

  useEffect(() => {
    makeConfig();
  }, [max, min, enableLimits]);

  const onChangeMax = (value: string) => {
    let val = parseInt(value);
    if (val > min) {
      setMax(val);
    }
  };

  const onChangeMin = (value: string) => {
    let val = parseInt(value);
    if (val < max) {
      setMin(val);
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
              <span className="text-sm">Valor mínimo</span>
              <Input
                type="number"
                value={min.toString()}
                onValueChange={onChangeMin}
                size="sm"
                className="max-w-[5rem]"
                classNames={{
                  inputWrapper: "h-fit",
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">Valor máximo</span>
              <Input
                type="number"
                value={max.toString()}
                onValueChange={onChangeMax}
                size="sm"
                className="max-w-[5rem]"
                classNames={{
                  inputWrapper: "h-fit",
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
  component: Number,
  configuration: Configuration,
};
