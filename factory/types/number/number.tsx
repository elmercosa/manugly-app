import { Input, Switch } from "@nextui-org/react";
import { Icon123 } from "@tabler/icons-react";
import { useCounter } from "@uidotdev/usehooks";
import { parse } from "path";
import { use, useEffect, useState } from "react";

import { useParameters } from "@/app/contexts/parameter/context";
import CustomInputNumber from "@/components/custom/custom-input-number";
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
  const [config, setConfig] = useState({ min: 0, max: 100, required: false });
  const [value, setValue] = useState(-9999999990);
  const paramsContext = useParameters();
  useEffect(() => {
    if (paramsContext.state.parameters.length) {
      let param = paramsContext.state.parameters[index];
      let config = JSON.parse(param.data.configuration[0].configuration);
      setConfig(config);
      if (typeof param.data.value == "string") {
        let valueAux = parseInt(param.data.value);
        if (valueAux != value) {
          setValue(valueAux);
          let isValid = valueAux >= config.min && valueAux <= config.max;
          paramsContext.dispatch({
            type: "setIsValid",
            index: index,
            isValid: isValid,
          });
          paramsContext.dispatch({
            type: "setIsValidated",
            index: index,
            isValidated: true,
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
      errorMessage={`Este valor ${
        config.required ? "es obligatorio y" : ""
      } debe estar entre ${config.min} y ${config.max}`}
      description={`Este valor debe estar entre ${config.min} y ${config.max}`}
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
