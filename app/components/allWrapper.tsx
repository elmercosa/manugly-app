"use client";
import React from "react";

import BusinessWrapper from "@/components/business/businessWrapper";
import ParametersWrapper from "@/components/parameters/parametersWrapper";

export default function AllWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BusinessWrapper>
      <ParametersWrapper>{children}</ParametersWrapper>
    </BusinessWrapper>
  );
}
