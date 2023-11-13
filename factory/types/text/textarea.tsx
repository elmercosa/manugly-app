import { Input, Switch, Textarea } from "@nextui-org/react";
import { useCounter } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

import { useParameters } from "@/app/contexts/parameter/context";
import CustomInputNumber from "@/components/custom/custom-input-number";
import { ExportType } from "@/factory/types/interfaces";

import { ParamComponent, ParamConfiguration } from "../param";

const name = "Texto largo";
const type = "textarea";

function TextAreaCustom({
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
  const [required, setRequired] = useState(false);
  const [config, setConfig] = useState({});
  const [max, setMax] = useState(100);

  const makeConfig = () => {
    const configuration = {
      max,
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
      if (paramData.configuration && paramData.configuration.length > 0) {
        const config = JSON.parse(paramData.configuration[0].configuration);
        setMax(config.max);
        setRequired(config.required);
        makeConfig();
      }
    }
  }, [paramData]);

  useEffect(() => {
    makeConfig();
  }, [max, required]);

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
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">Valor mínimo</span>
          <Input
            type="number"
            value={max.toString()}
            onValueChange={(value) => setMax(parseInt(value))}
            size="sm"
            className="max-w-[5rem]"
            classNames={{
              inputWrapper: "h-fit",
            }}
          />
        </div>
      </div>
    </ParamConfiguration>
  );
}

export const Schema: ExportType = {
  type,
  name,
  component: TextAreaCustom,
  configuration: Configuration,
};
