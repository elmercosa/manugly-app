import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconDeviceFloppy,
  IconSquareRoundedPlusFilled,
  IconTrashFilled,
  IconYinYangFilled,
} from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setTimeout } from "timers";

import { useBusiness } from "@/app/contexts/business/context";
import { useParameters } from "@/app/contexts/parameter/context";
import ManuglyIcon from "@/app/icons/ManuglyIcon";
import { Loader } from "@/components/loader";
import entityService from "@/services/entityService";
import { paramService } from "@/services/paramService";

export function ParamComponent({
  paramTitle,
  children,
  save,
  data,
  type,
  index,
  userId,
  errorMessage,
  description,
  validateParam,
}: {
  children: ReactNode;
  save: boolean;
  data: any;
  type: string;
  paramTitle: string;
  index: number;
  userId: string;
  errorMessage: string;
  description: string;
  validateParam: any;
}) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [required, setRequired] = useState(false);

  const [config, setConfig] = useState({} as any);

  //invalid state
  const [isValid, setIsValid] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);

  // Value
  const [value, setValue] = useState(undefined as any);
  const [idValue, setIdValue] = useState(null as any);

  // Contexts
  const businessContext = useBusiness();
  const paramsContext = useParameters();

  const switchSaveState = () => {
    paramsContext.dispatch({
      type: "setIsSaving",
      index: index,
    });
  };

  const afterSave = (response: any) => {
    if (response) {
      setIsSaved(true);
      setErrorOnSave(false);
      paramsContext.dispatch({
        type: "setError",
        index: index,
        hasErrors: false,
      });
    } else {
      setErrorOnSave(true);
      setIsSaved(false);
      paramsContext.dispatch({
        type: "setError",
        index: index,
        hasErrors: true,
      });
    }
    switchSaveState();
  };

  const saveParam = async () => {
    let valueAux = value;

    if ((type === "checkbox" || type === "number") && valueAux != undefined) {
      valueAux = value.toString();
    }

    if (
      (type === "text" || type === "textarea" || type === "date") &&
      valueAux == undefined
    ) {
      valueAux = "";
    }

    if (type === "number" && valueAux == undefined) {
      valueAux = "0";
    }

    if (type === "checkbox" && valueAux == undefined) {
      valueAux = false;
    }

    const param = {
      businessId: businessContext.state.business.id,
      value: valueAux,
      userId: userId,
      paramId: id,
    };
    const response = await paramService.linkParam(param);

    if (response) {
      setIdValue(true);
    }

    afterSave(response);
  };

  const updateParam = async () => {
    let valueAux =
      type === "checkbox" || type === "number" ? value.toString() : value;
    const param = {
      businessId: businessContext.state.business.id,
      id: id,
      value: valueAux,
      userId: userId,
    };
    const response = await paramService.setValue(param);

    afterSave(response);
  };

  useEffect(() => {
    if (save && !isSaved) {
      switchSaveState();
      if (idValue === null) {
        saveParam();
      } else {
        updateParam();
      }
    }
  }, [save]);

  useEffect(() => {
    if (data.id) {
      setId(data.id);
      setTitle(data.title);

      if (data.value) {
        setIdValue(data.idValue);

        if (type === "checkbox") {
          setValue(data.value === "true");
        } else {
          setValue(data.value);
        }
      }

      if (data.configuration && data.configuration.length) {
        const config = JSON.parse(data.configuration[0].configuration);
        if (type === "checkbox" && config.checkedDefault) {
          setValue(true);
        }
        setConfig(config);
        setRequired(config.required);
      }
    }
  }, [data]);

  useEffect(() => {
    setIsSaved(false);
    let isValid = validateParam(value, config);
    setIsValid(isValid);
    paramsContext.dispatch({ type: "setValue", index: index, value: value });
    if (isValid) {
      paramsContext.dispatch({
        type: "setIsValid",
        index: index,
        isValid: isValid,
      });
    }
  }, [value]);

  useEffect(() => {
    if (paramsContext.state.parameters.length && isValid) {
      let param = paramsContext.state.parameters[index];
      if (param) {
        setIsValid(param.isValid);
      }
    }
  }, [paramsContext]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-xl">
      <div className="flex flex-col justify-between h-full gap-4">
        {type !== "textarea" && type !== "checkbox" && type !== "date" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">
                {paramTitle}
              </span>
              <h2 className="text-xl font-bold">
                {title}
                {required && <span className="text-red-500">*</span>}
              </h2>
            </div>
            <Input
              type={type}
              name="name"
              value={value}
              onValueChange={(data) => setValue(data)}
              isRequired={required}
              variant="bordered"
              errorMessage={!isValid ? errorMessage : ""}
              description={description}
              isInvalid={!isValid}
              size="sm"
              isClearable
              isDisabled={userId === ""}
            />
          </div>
        )}

        {type === "date" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">
                {paramTitle}
              </span>
              <h2 className="text-xl font-bold">
                {title}
                {required && <span className="text-red-500">*</span>}
              </h2>
            </div>
            <Input
              type={type}
              name="name"
              value={value}
              onValueChange={(data) => setValue(data)}
              isRequired={required}
              variant="bordered"
              errorMessage={!isValid ? errorMessage : ""}
              description={description}
              isInvalid={!isValid}
              size="sm"
              min={JSON.parse(data.configuration[0].configuration).min}
              max={JSON.parse(data.configuration[0].configuration).max}
              isClearable
              isDisabled={userId === ""}
            />
          </div>
        )}

        {type === "textarea" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">
                {paramTitle}
              </span>
              <h2 className="text-xl font-bold">
                {title}
                {required && <span className="text-red-500">*</span>}
              </h2>
            </div>
            <Textarea
              value={value}
              onValueChange={setValue}
              isRequired={required}
              variant="bordered"
              errorMessage={!isValid ? "Este campo es obligatorio" : ""}
              isInvalid={!isValid}
              size="sm"
              isDisabled={userId === ""}
            />
          </div>
        )}

        {type === "checkbox" && (
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">
                {paramTitle}
              </span>
              <h2 className="text-xl font-bold">
                {title}
                {required && <span className="text-red-500">*</span>}
              </h2>
            </div>
            <Switch
              size="sm"
              isSelected={value}
              onValueChange={setValue}
              aria-label={title}
              classNames={{
                wrapper: "m-0",
              }}
              isDisabled={userId === ""}
            />
          </div>
        )}
        <div className="flex justify-end gap-2 bottom-2 right-2 ">
          {isSaved && (
            <Chip
              startContent={<IconCircleCheckFilled size={18} />}
              variant="flat"
              color="success"
              classNames={{
                content: "text-black",
              }}
              radius="sm"
            >
              Guardado
            </Chip>
          )}
          {errorOnSave && (
            <Chip
              startContent={<IconCircleXFilled size={18} />}
              variant="flat"
              color="danger"
              classNames={{
                content: "text-black",
              }}
              radius="sm"
            >
              Error al guardar
            </Chip>
          )}
        </div>
      </div>
    </div>
  );
}

export function ParamConfiguration({
  paramTitle,
  children,
  data,
  config,
  type,
  index,
}: {
  children: ReactNode;
  data: any;
  config: any;
  type: string;
  paramTitle: string;
  index: number;
}) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [required, setRequired] = useState(false);

  const [save, setSave] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const businessContext = useBusiness();
  const paramsContext = useParameters();

  const switchSaveState = () => {
    paramsContext.dispatch({
      type: "setIsSaving",
      index: index,
    });
  };

  const afterSave = (response: any) => {
    if (response) {
      setIsSaved(true);
      setErrorOnSave(false);
      paramsContext.dispatch({
        type: "setError",
        index: index,
        hasErrors: false,
      });
    } else {
      setErrorOnSave(true);
      setIsSaved(false);
      paramsContext.dispatch({
        type: "setError",
        index: index,
        hasErrors: true,
      });
    }
    setSave(false);
    setSaving(false);
    switchSaveState();
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const normalize = (str: string) => {
    const key = str.toLowerCase().replace(/ /g, "_");
    return key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const removeParam = async () => {
    setIsDeleting(true);
    if (id) {
      const response = await entityService("parameters").remove(id);

      if (response) {
        toast.success("Parámetro eliminado correctamente");
        paramsContext.dispatch({
          type: "remove",
          index: index,
        });
      } else {
        toast.error("No se pudo eliminar el parámetro");
      }
    } else {
      toast.success("Parámetro eliminado correctamente");
      paramsContext.dispatch({
        type: "remove",
        index: index,
      });
    }
    setIsDeleting(false);
    setIsOpen(false);
  };

  const saveParam = async () => {
    const configuration = JSON.stringify(config);

    const key = normalize(title);

    const param = {
      title: title,
      key: key,
      type: type,
      config: configuration,
      businessId: businessContext.state.business.id,
    };
    const response = await entityService("parameters").create(param);

    if (response) {
      setId(response.id);
    }

    afterSave(response);
  };

  const updateParam = async () => {
    const configuration = JSON.stringify(config);

    const param = {
      config: configuration,
      businessId: businessContext.state.business.id,
      id: id,
    };
    const response = await entityService("parameters").edit(param);

    afterSave(response);
  };

  useEffect(() => {
    if (save) {
      switchSaveState();
      if (isRepeated) {
        toast.error(`El parámetro ${title} de tipo ${type} ya existe`);
        setSave(false);
      } else {
        setSaving(true);
        if (id === null) {
          saveParam();
        } else {
          updateParam();
        }
      }
    }
  }, [save]);

  useEffect(() => {
    if (data.id) {
      setId(data.id);
      setTitle(data.title);
      if (data.configuration && data.configuration.length) {
        const config = JSON.parse(data.configuration[0].configuration);
        setRequired(config.required);
      }
      paramsContext.dispatch({
        type: "setIsValid",
        index: index,
        isValid: true,
      });
    }
  }, [data]);

  useEffect(() => {
    if (id === null) {
      checkIsRepeated();
    }
  }, [paramsContext]);

  useEffect(() => {
    if (config) {
      config.required = required;
    }
  }, [required, config]);

  useEffect(() => {
    if (title.length) {
      const key = normalize(title);
      paramsContext.dispatch({
        type: "setParamData",
        index: index,
        title,
        key,
      });
      checkIsRepeated();
    }
  }, [title]);

  const checkIsRepeated = () => {
    setTimeout(() => {
      const key = normalize(title);
      const repeated = paramsContext.state.parameters.filter(
        (param) => param.data.key == key && param.data.type == type,
      );
      setIsRepeated(repeated.length > 1);
    }, 50);
  };

  return (
    <div className="relative flex flex-col gap-4 p-4 bg-white rounded-xl">
      <Loader isLoading={saving} text="Guardando...">
        <div className="flex flex-col justify-between h-full gap-4">
          <div className="flex flex-col gap-6">
            {id == null ? (
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">{paramTitle}</h2>
                <Input
                  type="text"
                  name="name"
                  label={id !== null ? "" : "Nombre del parámetro"}
                  value={title}
                  onValueChange={setTitle}
                  readOnly={id !== null}
                  isInvalid={id == null && isRepeated}
                  variant={id !== null ? "faded" : "bordered"}
                  size="sm"
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">
                  {paramTitle}
                </span>
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
            )}
            <div className="relative flex flex-col gap-1">
              <h3 className="absolute top-0 px-2 text-sm font-semibold -translate-y-1/2 bg-white left-2">
                Configuración avanzada
              </h3>
              <div className="flex flex-col gap-2 p-3 pt-4 border rounded-lg">
                {children}
                <div className="flex items-center justify-between w-full gap-2">
                  <span className="text-sm">¿Obligatorio?</span>
                  <Switch
                    size="sm"
                    isSelected={required}
                    onValueChange={setRequired}
                    aria-label="¿Obligatorio?"
                    classNames={{
                      wrapper: "m-0",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 bottom-2 right-2 ">
            <Tooltip content="Borrar usuario" color="danger" placement="bottom">
              <Button
                startContent={<IconTrash size={16} />}
                onPress={() => setIsOpen(true)}
                isDisabled={saving}
                size="sm"
                className="w-7 h-7 min-h-[28px] min-w-[28px]"
                isIconOnly
                color="danger"
                variant="flat"
              ></Button>
            </Tooltip>
            <Tooltip
              content="Guardar usuario"
              color="primary"
              placement="bottom"
              classNames={{
                content: "text-white",
              }}
            >
              <Button
                startContent={<IconDeviceFloppy size={16} />}
                onPress={() => setSave(true)}
                isDisabled={saving}
                size="sm"
                className="w-7 h-7 min-h-[28px] min-w-[28px]"
                isIconOnly
                color="primary"
                variant="flat"
              ></Button>
            </Tooltip>
            {isSaved && (
              <Chip
                startContent={<IconCircleCheckFilled size={18} />}
                variant="flat"
                color="success"
                classNames={{
                  content: "text-black",
                }}
                radius="sm"
              >
                Guardado
              </Chip>
            )}
            {errorOnSave && (
              <Chip
                startContent={<IconCircleXFilled size={18} />}
                variant="flat"
                color="danger"
                classNames={{
                  content: "text-black",
                }}
                radius="sm"
              >
                Error al guardar
              </Chip>
            )}
            {isRepeated && (
              <Chip
                startContent={<IconAlertTriangleFilled size={18} />}
                variant="flat"
                color="warning"
                radius="sm"
              >
                Parámetro repetido
              </Chip>
            )}

            {!id && (
              <Chip
                startContent={<IconSquareRoundedPlusFilled size={18} />}
                variant="flat"
                color="secondary"
                radius="sm"
              >
                Nuevo
              </Chip>
            )}
          </div>
          <Modal isOpen={isOpen} hideCloseButton={true}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1 text-xl">
                ¿Estás seguro?
              </ModalHeader>
              <ModalBody>
                <p>
                  Este parmámetro se eliminará de todos los usuarios que lo
                  tengan asignado y no podrás recuperarlo.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setIsOpen(false)}
                >
                  No
                </Button>
                <Button
                  className="text-white shadow-md bg-manugly"
                  onPress={removeParam}
                  isLoading={isDeleting}
                >
                  Sí
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </Loader>
    </div>
  );
}

export function ParamFilter({
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
  const [value, setValue] = useState("");
  return (
    <div className="relative flex flex-col gap-4 p-4 bg-white rounded-xl">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">{type}</span>
          <h2 className="text-xl font-bold">{name}</h2>
        </div>
        <Input
          type="text"
          name="name"
          value={value}
          onValueChange={setValue}
          variant={"bordered"}
          size="sm"
        />
      </div>
    </div>
  );
}
