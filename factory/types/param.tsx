import {
  Button,
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
import { ReactNode, useEffect, useState } from "react";

import { useBusiness } from "@/app/contexts/business/context";
import { paramService } from "@/services/paramService";

function Component({
  children,
  save,
  data,
}: {
  children: ReactNode;
  save: boolean;
  data: any;
}) {
  return { children };
}

export function ParamConfiguration({
  paramTitle,
  children,
  save,
  data,
  config,
  type,
}: {
  children: ReactNode;
  save: boolean;
  data: any;
  config: any;
  type: string;
  paramTitle: string;
}) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const businessContext = useBusiness();

  const removeParam = async () => {
    const param = {
      businessId: businessContext.state.business.id,
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
    const configuration = JSON.stringify(config);

    const key = title.toLowerCase().replace(/ /g, "_");
    const keyNormalized = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const param = {
      title: title,
      key: keyNormalized,
      type: type,
      config: configuration,
      businessId: businessContext.state.business.id,
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
  };

  const updateParam = async () => {
    const configuration = JSON.stringify(config);

    const param = {
      config: configuration,
      businessId: businessContext.state.business.id,
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
    if (data) {
      setId(data.id);
      setTitle(data.title);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-2xl font-semibold">{paramTitle}</h2>
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
        <div className="flex gap-2">{children}</div>
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
