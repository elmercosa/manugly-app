import React from "react";

export interface AvatarProps {
  src?: string;
  color?: AvatarColor;
  radius?: AvatarRadius;
  size?: AvatarSize;
  name: string;
  icon?: React.ReactNode;
  fallback?: React.ReactNode;
  showFallback?: boolean;
  isBordered?: boolean;
  isDisabled?: boolean;
  isFocusable?: boolean;
  className?: string;
}

export enum AvatarColor {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

export enum AvatarRadius {
  None = "none",
  Small = "sm",
  Medium = "md",
  Large = "lg",
  Full = "full",
}

export enum AvatarSize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
}
