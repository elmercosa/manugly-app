import {
  Button,
  Checkbox,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { ExportType } from "@/factory/types/interfaces";
import { paramService } from "@/services/paramService";

const name = "Fecha";
const type = "date";

function Date({
  save,
  paramData,
  userId,
  businessId,
}: {
  save?: any;
  paramData?: any;
  userId?: any;
  businessId?: any;
}) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");

  const [isSaved, setIsSaved] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);
  const [saving, setSaving] = useState(false);

  // Config
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [required, setRequired] = useState(false);

  // Value
  const [value, setValue] = useState("");

  const saveParam = async () => {
    setSaving(true);

    const param = {
      paramId: id,
      value: value,
      userId: userId,
    };
    const response = await paramService.linkParam(param);

    if (response) {
      setId(response.id);
      setIsSaved(true);
      setErrorOnSave(false);
    } else {
      setErrorOnSave(true);
      setIsSaved(false);
    }

    setSaving(false);
  };

  const updateParam = async () => {
    setSaving(true);

    const param = {
      businessId: businessId,
      id: id,
      value: value,
      userId: userId,
    };
    const response = await paramService.setValue(param);

    if (response) {
      setId(response.id);
      setIsSaved(true);
      setErrorOnSave(false);
    } else {
      setErrorOnSave(true);
      setIsSaved(false);
    }

    setSaving(false);
  };

  useEffect(() => {
    if (save && !isSaved) {
      if (id === null) {
        saveParam();
      } else {
        updateParam();
      }
    }
  }, [save]);

  useEffect(() => {
    if (paramData) {
      setId(paramData.id);
      setTitle(paramData.title);
      // if (paramData.configuration && paramData.configuration.length > 0) {
      //   const config = JSON.parse(paramData.configuration[0].configuration);
      //   setMax(config.max);
      //   setMin(config.min);
      //   setRequired(config.required);
      // }
    }
  }, [paramData]);

  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex">
        <Input
          type="date"
          label="Escribe aquí"
          placeholder="12/12/2015"
          labelPlacement="outside"
          value={value}
          onValueChange={setValue}
        />
      </div>
      <div className="flex justify-end absolute top-0 right-0">
        {isSaved && (
          <Chip
            startContent={<IconCircleCheckFilled size={18} />}
            variant="faded"
            color="success"
          >
            Guardado
          </Chip>
        )}
        {errorOnSave && (
          <Chip
            startContent={<IconCircleXFilled size={18} />}
            variant="faded"
            color="danger"
          >
            Error al guardar
          </Chip>
        )}

        {saving && (
          <Chip
            startContent={
              <Spinner aria-label="Loading..." size="sm" className="text-xs" />
            }
            variant="faded"
            className="text-xs"
          >
            Guardando cambios...
          </Chip>
        )}
      </div>
    </div>
  );
}

function Configuration({ save, paramData }: { save?: any; paramData?: any }) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");

  const [isSaved, setIsSaved] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);
  const [saving, setSaving] = useState(false);

  const businessId = "";

  // Config
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [required, setRequired] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const removeParam = async () => {
    setIsOpen(false);
  };

  const saveParam = async () => {
    setSaving(true);

    const config = {
      max: max,
      min: min,
      required: required,
    };

    const key = title.toLowerCase().replace(/ /g, "_");
    const keyNormalized = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const param = {
      title: title,
      key: keyNormalized,
      type: type,
      config: JSON.stringify(config),
      businessId: businessId,
    };
    const response = await paramService.createParam(param);

    if (response) {
      setId(response.id);
      setIsSaved(true);
      setErrorOnSave(false);
    } else {
      setErrorOnSave(true);
      setIsSaved(false);
    }

    setSaving(false);
  };

  const updateParam = async () => {
    setSaving(true);

    const config = {
      max: max,
      min: min,
      required: required,
    };

    const param = {
      config: JSON.stringify(config),
      businessId: businessId,
      id: id,
    };
    const response = await paramService.editParam(param);

    if (response) {
      setIsSaved(true);
      setErrorOnSave(false);
    } else {
      setErrorOnSave(true);
      setIsSaved(false);
    }

    setSaving(false);
  };

  useEffect(() => {
    if (save && !isSaved) {
      if (id === null) {
        saveParam();
      } else {
        updateParam();
      }
      setSaving(false);
    }
  }, [save]);

  useEffect(() => {
    if (paramData) {
      setId(paramData.id);
      setTitle(paramData.title);
      if (paramData.configuration && paramData.configuration.length > 0) {
        const config = JSON.parse(paramData.configuration[0].configuration);
        setMax(config.max);
        setMin(config.min);
        setRequired(config.required);
      }
    }
  }, [paramData]);

  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-2xl font-semibold">Fecha</h2>
      <div className="flex">
        <Input
          type="text"
          name="name"
          label="Nombre del parámetro"
          value={title}
          onValueChange={setTitle}
          readOnly={id !== null}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold">Configuración avanzada</h3>
        <div className="flex gap-2">
          <Input
            type="date"
            label="Fecha minima permitida"
            variant="bordered"
            value={max}
            onValueChange={setMax}
            placeholder="12/12/2015"
          />
          <Input
            type="date"
            label="Fecha minima permitida"
            variant="bordered"
            value={min}
            onValueChange={setMin}
            placeholder="12/12/2015"
          />
          <Checkbox isSelected={required} onValueChange={setRequired}>
            ¿Obligatorio?
          </Checkbox>
        </div>
      </div>
      <div className="flex justify-end absolute top-0 right-0">
        <Tooltip content="Borrar usuario">
          <Button
            startContent={<IconTrash size={16} />}
            onPress={() => setIsOpen(true)}
            isDisabled={saving}
            color="danger"
            variant="light"
            isIconOnly
          ></Button>
        </Tooltip>
      </div>
      <div className="flex justify-end absolute bottom-0 right-0">
        {isSaved && (
          <Chip
            startContent={<IconCircleCheckFilled size={18} />}
            variant="faded"
            color="success"
          >
            Guardado
          </Chip>
        )}
        {errorOnSave && (
          <Chip
            startContent={<IconCircleXFilled size={18} />}
            variant="faded"
            color="danger"
          >
            Error al guardar
          </Chip>
        )}

        {saving && (
          <Chip
            startContent={
              <Spinner aria-label="Loading..." size="sm" className="text-xs" />
            }
            variant="faded"
            className="text-xs"
          >
            Guardando cambios...
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
            >
              Sí
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export const Schema: ExportType = {
  type,
  name,
  component: Date,
  configuration: Configuration,
};
