import { Avatar as NAvatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { AvatarProps } from "./avatar.types";

export default function Avatar(props: AvatarProps) {
  return (
    <div className="flex gap-3 items-center">
      <NAvatar
        name={props.name}
        src={props.src}
        color={props.color}
        size={props.size}
        isDisabled={props.isDisabled}
        radius={props.radius}
        icon={props.icon}
        fallback={props.fallback}
        showFallback={props.showFallback}
        isBordered={props.isBordered}
        isFocusable={props.isFocusable}
        className={props.className}
      />
    </div>
  );
}
