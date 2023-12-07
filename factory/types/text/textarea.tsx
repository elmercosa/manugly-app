import { useEffect, useState } from "react";

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
      errorMessage={`Este valor ${
        config.required ? "es obligatorio y" : ""
      } debe estar entre ${config.min} y ${config.max}`}
      description={`Este valor debe estar entre ${config.min} y ${config.max}`}
    >
      <></>
    </ParamComponent>
  );
}

function Configuration({ paramData, index }: { paramData?: any; index?: any }) {
  return (
    <ParamConfiguration
      data={paramData}
      config={{}}
      type={type}
      paramTitle={name}
      index={index}
    >
      <></>
    </ParamConfiguration>
  );
}

function Filter({
  index,
  name,
  type,
  setFilterValue,
}: {
  index: number;
  name: string;
  type: string;
  setFilterValue: any;
}) {
  return <></>;
}

export const Schema: ExportType = {
  type,
  name,
  component: TextAreaCustom,
  configuration: Configuration,
  filter: Filter,
};
