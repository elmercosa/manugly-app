import { Input, Switch } from "@nextui-org/react";
import { Icon123 } from "@tabler/icons-react";
import { useCounter } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

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
      <Icon123 size={18} />
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
  const maxNumber = useCounter(3, {
    min: 3,
  });
  const minNumber = useCounter(3, {
    min: 3,
  });

  const [config, setConfig] = useState({});

  const makeConfig = () => {
    const configuration = {
      max: maxNumber[0],
      min: minNumber[0],
    };
    setConfig(configuration);
  };

  useEffect(() => {
    if (paramData) {
      if (paramData.configuration && paramData.configuration.length > 0) {
        const config = JSON.parse(paramData.configuration[0].configuration);
        maxNumber[1].set(config.max);
        minNumber[1].set(config.min);
        makeConfig();
      }
    }
  }, [paramData]);

  useEffect(() => {
    makeConfig();
  }, [maxNumber[0], minNumber[0]]);

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
          <CustomInputNumber
            number={maxNumber[0]}
            increment={maxNumber[1].increment}
            decrement={maxNumber[1].decrement}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">Valor máximo</span>
          <CustomInputNumber
            number={minNumber[0]}
            increment={minNumber[1].increment}
            decrement={minNumber[1].decrement}
          />
        </div>
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
