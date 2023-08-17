import Avatar from "@/components/avatar/avatar";
import {
  AvatarColor,
  AvatarSize,
  AvatarRadius,
} from "@/components/avatar/avatar.types";
import Snippet from "../snippet/snippet";

import { Button } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";

export default function AvatarDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Avatares</h2>
        <p>
          El componente Avatar se utiliza para representar a un usuario, y
          muestra la foto de perfil, las iniciales o el icono alternativo
        </p>
        <Snippet text="import Avatar from '@/components/avatar/avatar'"></Snippet>

        <h3 className="text-xl">Tipos</h3>
        <Snippet text="import { AvatarColor, AvatarSize, AvatarRadius} from '@/components/avatar/avatar.types'"></Snippet>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl">Uso normal</h3>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Avatar name="test" />
            <Avatar
              name="test"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl">Tamaños</h3>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Avatar name="test" size={AvatarSize.Small} />
            <Avatar name="test" size={AvatarSize.Medium} />
            <Avatar name="test" size={AvatarSize.Large} />
          </div>
          <div className="flex gap-2">
            <Avatar
              name="test"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              size={AvatarSize.Small}
            />
            <Avatar
              name="test"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              size={AvatarSize.Medium}
            />
            <Avatar
              name="test"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              size={AvatarSize.Large}
            />
          </div>
        </div>
      </div>

      <div className="bg-black border-red-500 border p-5 flex gap-4">
        <Button color="primary" className="text-white">
          Hola
        </Button>
        <Button color="secondary" className="text-white" variant="bordered">
          Hola
        </Button>
        <Button color="primary" className="text-white" variant="light">
          Hola
        </Button>
        <Button color="primary" className="text-white" isLoading>
          Hola
        </Button>
        <Button
          color="primary"
          className="text-white"
          startContent={<HeartIcon />}
        >
          Hola
        </Button>
        <Button
          isIconOnly
          color="primary"
          className="text-white"
          aria-label="Like"
        >
          <HeartIcon />
        </Button>
      </div>
      <div className="bg-white border-red-500 border p-5 mb-5 flex gap-4">
        <Button color="primary" className="text-white">
          Hola
        </Button>
        <Button color="secondary" variant="bordered">
          Hola
        </Button>
        <Button color="primary" variant="light">
          Hola
        </Button>
        <Button color="primary" className="text-white" isLoading>
          Hola
        </Button>
        <Button
          color="primary"
          className="text-white"
          startContent={<HeartIcon />}
        >
          Hola
        </Button>
        <Button
          isIconOnly
          color="primary"
          className="text-white"
          aria-label="Like"
        >
          <HeartIcon />
        </Button>
      </div>
    </div>
  );
}
