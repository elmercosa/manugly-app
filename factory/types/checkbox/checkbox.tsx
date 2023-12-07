import { Checkbox, Chip, Input, Spinner, Switch } from "@nextui-org/react";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useParameters } from "@/app/contexts/parameter/context";
import { ExportType } from "@/factory/types/interfaces";
import { paramService } from "@/services/paramService";

import { ParamComponent, ParamConfiguration } from "../param";

const name = "Casilla";
const type = "checkbox";

function CheckboxCustom({
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
  const validateParam = (value: any, config: any) => {
    return true;
  };
  return (
    <ParamComponent
      save={save}
      data={paramData}
      type={type}
      paramTitle={name}
      index={index}
      userId={userId}
      validateParam={validateParam}
      description=""
      errorMessage=""
    >
      <></>
    </ParamComponent>
  );
}

function Configuration({ paramData, index }: { paramData?: any; index?: any }) {
  // Config
  const [checkedDefault, setCheckedDefault] = useState(false);
  const [config, setConfig] = useState({});

  useEffect(() => {
    if (
      paramData &&
      paramData.configuration &&
      paramData.configuration.length > 0
    ) {
      const config = JSON.parse(paramData.configuration[0].configuration);
      setCheckedDefault(config.checkedDefault);
    }
  }, [paramData]);

  useEffect(() => {
    makeConfig();
  }, [checkedDefault]);

  const makeConfig = () => {
    const configuration = {
      checkedDefault: checkedDefault,
    };
    setConfig(configuration);
  };

  return (
    <ParamConfiguration
      data={paramData}
      config={config}
      type={type}
      paramTitle={name}
      index={index}
    >
      <div className="flex items-center justify-between w-full gap-2">
        <span className="text-sm">¿Marcado por defecto?</span>
        <Switch
          size="sm"
          isSelected={checkedDefault}
          onValueChange={setCheckedDefault}
          aria-label="¿Marcado por defecto?"
          classNames={{
            wrapper: "m-0",
          }}
        />
      </div>
    </ParamConfiguration>
  );
}

function Filter({
  index,
  title,
  type,
  setFilterValue,
}: {
  index: number;
  title: string;
  type: string;
  setFilterValue: any;
}) {
  const [value, setValue] = useState("");
  const ParamContext = useParameters();
  useEffect(() => {
    ParamContext.dispatch({ type: "setValue", value, index });
  }, [value]);

  return <></>;
}

export const Schema: ExportType = {
  type,
  name,
  component: CheckboxCustom,
  configuration: Configuration,
  filter: Filter,
};
