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
  IconSquareRoundedPlusFilled,
  IconTrashFilled,
} from "@tabler/icons-react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setTimeout } from "timers";

import { useBusiness } from "@/app/contexts/business/context";
import { ParamsType, useParameters } from "@/app/contexts/parameter/context";
import { paramService } from "@/services/paramService";

export function ParamComponent({
  paramTitle,
  children,
  save,
  data,
  config,
  type,
  index,
  userId,
}: {
  children: ReactNode;
  save: boolean;
  data: any;
  config: any;
  type: string;
  paramTitle: string;
  index: number;
  userId: string;
}) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [required, setRequired] = useState(false);

  //invalid state
  const [isInvalid, setIsInvalid] = useState(false);

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
    let valueAux = type === "checkbox" ? value.toString() : value;

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
    let valueAux = type === "checkbox" ? value.toString() : value;
    console.log("valueAux :>> ", valueAux);
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
    if (type === "checkbox") {
      setValue(false);
    }
  }, [type]);

  useEffect(() => {
    if (data.id) {
      setId(data.id);
      setTitle(data.title);

      if (data.value) {
        setIdValue(data.idValue);
        console.log("data :>> ", data);
        if (type === "checkbox") {
          setValue(data.value === "true");
        } else {
          setValue(data.value);
        }
      }

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
    console.log("value :>> ", value);
    if (value) {
      setIsSaved(false);
      paramsContext.dispatch({
        type: "setValue",
        index: index,
        value: value,
      });
      paramsContext.dispatch({
        type: "setIsValid",
        index: index,
        isValid: true,
      });
    }
  }, [value]);

  useEffect(() => {
    if (paramsContext.state.parameters.length) {
      let param = paramsContext.state.parameters[index];
      if (param && !param.isValid) {
        setIsInvalid(true);
      } else {
        setIsInvalid(false);
      }
    }
  }, [paramsContext]);

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4 justify-between h-full">
        {type !== "textarea" && type !== "checkbox" && (
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
              startContent={children}
              name="name"
              value={value}
              onValueChange={(data) => setValue(data)}
              isRequired={required}
              variant="bordered"
              errorMessage={isInvalid ? "Este campo es obligatorio" : ""}
              isInvalid={isInvalid}
              size="sm"
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
              errorMessage={isInvalid ? "Este campo es obligatorio" : ""}
              isInvalid={isInvalid}
              size="sm"
            />
          </div>
        )}

        {type === "checkbox" && (
          <div className="flex items-center gap-2 w-full justify-between">
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
            />
          </div>
        )}
        <div className="flex justify-end bottom-2 right-2 gap-2 ">
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
  save,
  data,
  config,
  type,
  index,
}: {
  children: ReactNode;
  save: boolean;
  data: any;
  config: any;
  type: string;
  paramTitle: string;
  index: number;
}) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [required, setRequired] = useState(false);

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
    switchSaveState();
  };

  const normalize = (str: string) => {
    const key = str.toLowerCase().replace(/ /g, "_");
    return key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const removeParam = async () => {
    setIsDeleting(true);
    if (id) {
      const param = {
        businessId: businessContext.state.business.id,
        parameterId: id,
      };
      const response = await paramService.removeParam(param);

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
    const response = await paramService.createParam(param);

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
    const response = await paramService.editParam(param);

    afterSave(response);
  };

  useEffect(() => {
    if (save && !isSaved) {
      switchSaveState();
      if (id === null) {
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
        (param) => param.data.key == key,
      );

      if (repeated.length > 1) {
        setIsRepeated(true);
        paramsContext.dispatch({
          type: "setIsValid",
          index: index,
          isValid: false,
        });
      } else {
        setIsRepeated(false);
        paramsContext.dispatch({
          type: "setIsValid",
          index: index,
          isValid: true,
        });
      }
    }, 50);
  };

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4 justify-between h-full">
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
          <div className="flex flex-col gap-1 relative">
            <h3 className="text-sm font-semibold absolute top-0 left-2 -translate-y-1/2 bg-white px-2">
              Configuración avanzada
            </h3>
            <div className="flex flex-col gap-2 border rounded-lg p-3 pt-4">
              {children}
              <div className="flex items-center gap-2 w-full justify-between">
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
        <div className="flex justify-end bottom-2 right-2 gap-2 ">
          <Tooltip
            content="Borrar usuario"
            color="danger"
            placement="left-start"
          >
            <Button
              startContent={<IconTrashFilled size={16} />}
              onPress={() => setIsOpen(true)}
              isDisabled={saving}
              size="sm"
              className="w-7 h-7 min-h-[28px] min-w-[28px]"
              isIconOnly
              color="danger"
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
              classNames={{
                content: "text-black",
              }}
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
              classNames={{
                content: "text-black",
              }}
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
                Este parmámetro se eliminará de todos los usuarios que lo tengan
                asignado y no podrás recuperarlo.
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
                className="bg-emerald-500 text-white shadow-md"
                onPress={removeParam}
                isLoading={isDeleting}
              >
                Sí
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
