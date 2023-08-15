import Avatar from "@/components/avatar/avatar";
import {
  AvatarColor,
  AvatarSize,
  AvatarRadius,
} from "@/components/avatar/avatar.types";
import Snippet from "../snippet/snippet";

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
    </div>
  );
}
