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
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { use, useEffect, useState } from "react";

import { businessAtom } from "@/app/store/store";
import { ExportType } from "@/factory/types/interfaces";
import { paramService } from "@/services/paramService";

const name = "Texto corto";
const type = "text";

function Text({
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

  const [business, setBusiness] = useAtom(businessAtom);

  // Config
  const [max, setMax] = useState("3");
  const [specialChars, setSpecialChars] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [required, setRequired] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // Value
  const [value, setValue] = useState("");

  const saveParam = async () => {
    setSaving(true);

    const param = {
      businessId: businessId,
      id: id,
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
      //   setSpecialChars(config.specialChars);
      //   setNumbers(config.numbers);
      //   setRequired(config.required);
      // }
    }
  }, [paramData]);

  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex">
        <Input
          type="text"
          label="Escribe aquí"
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

  const businessId = Cookies.get("businessId");

  // Config
  const [max, setMax] = useState("3");
  const [specialChars, setSpecialChars] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [required, setRequired] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const removeParam = async () => {
    const param = {
      businessId: Cookies.get("businessId"),
      parameterId: id,
    };
    const response = await paramService.removeParam(param);

    if (response) {
      console.log("11111 :>> ", 11111);
    } else {
      console.log("11111 :>> ", 1221);
    }
    setIsOpen(false);
  };

  const saveParam = async () => {
    setSaving(true);

    const config = {
      max: max,
      specialChars: specialChars,
      numbers: numbers,
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
      specialChars: specialChars,
      numbers: numbers,
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
        setSpecialChars(config.specialChars);
        setNumbers(config.numbers);
        setRequired(config.required);
      }
    }
  }, [paramData]);

  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-2xl font-semibold">Texto corto</h2>
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
            type="number"
            className="max-w-fit"
            name="max"
            label="Longitud máxima"
            variant="bordered"
            value={max}
            onValueChange={setMax}
            min={3}
          />
          <Checkbox isSelected={specialChars} onValueChange={setSpecialChars}>
            Permitir caracteres especiales
          </Checkbox>
          <Checkbox isSelected={numbers} onValueChange={setNumbers}>
            Permitir numeros
          </Checkbox>
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
  component: Text,
  configuration: Configuration,
};
