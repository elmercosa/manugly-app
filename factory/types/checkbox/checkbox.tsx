import { Checkbox, Chip, Spinner, Switch } from "@nextui-org/react";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

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
  return (
    <ParamComponent
      save={save}
      data={paramData}
      config={null}
      type={type}
      paramTitle={name}
      index={index}
      userId={userId}
      description=""
      errorMessage=""
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

  return (
    <ParamConfiguration
      save={save}
      data={paramData}
      config={config}
      type={type}
      paramTitle={name}
      index={index}
    >
      <div className="flex items-center gap-2 w-full justify-between">
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

export const Schema: ExportType = {
  type,
  name,
  component: CheckboxCustom,
  configuration: Configuration,
};
