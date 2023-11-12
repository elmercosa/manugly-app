import { Switch, Textarea } from "@nextui-org/react";
import { useCounter } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

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
  return (
    <ParamComponent
      save={save}
      data={paramData}
      config={null}
      type={type}
      paramTitle={name}
      index={index}
      userId={userId}
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
  const maxLines = useCounter(10, {
    min: 10,
  });

  const makeConfig = () => {
    const configuration = {
      max: maxLines[0],
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
        maxLines[1].set(config.max);
        setRequired(config.required);
        makeConfig();
      }
    }
  }, [paramData]);

  useEffect(() => {
    makeConfig();
  }, [maxLines[0], required]);

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
          <span className="text-sm">Máximo de líneas</span>
          <CustomInputNumber
            number={maxLines[0]}
            increment={maxLines[1].increment}
            decrement={maxLines[1].decrement}
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
