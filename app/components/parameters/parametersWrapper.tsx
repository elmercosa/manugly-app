"use client";

import { ReactNode } from "react";

import { ParameterProvider } from "@/app/contexts/parameter/context";

export default function ParametersWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <ParameterProvider>{children}</ParameterProvider>;
}
