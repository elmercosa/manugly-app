import { Chip, Input, Spinner, Switch } from "@nextui-org/react";
import {
  IconCalendarFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { ExportType } from "@/factory/types/interfaces";
import { paramService } from "@/services/paramService";

import { ParamComponent, ParamConfiguration } from "../param";

const name = "Fecha";
const type = "date";

function Date({
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
      <IconCalendarFilled size={18} />
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

  const [config, setConfig] = useState({});

  const makeConfig = () => {
    const configuration = {
      max: max,
      min: min,
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
    }
  }, [paramData]);

  useEffect(() => {
    makeConfig();
  }, [max, min]);

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
          <span className="text-sm">Fecha mínima</span>
          <Input
            type="date"
            value={max}
            onValueChange={setMax}
            size="sm"
            classNames={{
              inputWrapper: "w-fit p-1.5 h-fit",
              base: "w-fit",
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">Fecha máxima</span>
          <Input
            type="date"
            value={min}
            onValueChange={setMin}
            size="sm"
            classNames={{
              inputWrapper: "w-fit p-1.5 h-fit",
              base: "w-fit",
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
  component: Date,
  configuration: Configuration,
};
