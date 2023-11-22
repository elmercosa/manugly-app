"use client";

import { useEffect } from "react";

import { useBreadcrumb } from "@/app/contexts/breadcrumbs/context";

export default function Breadcrumb() {
  const breadcrumbContext = useBreadcrumb();
  useEffect(() => {}, [breadcrumbContext]);
  return (
    <h1 className="text-3xl font-bold text-neutral-700">
      {breadcrumbContext.state.breadcrumb || "Inicio"}
    </h1>
  );
}
