"use client";

import { ReactNode } from "react";

import { BreadcrumbProvider } from "@/app/contexts/breadcrumbs/context";

export default function BreadcrumbWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <BreadcrumbProvider>{children}</BreadcrumbProvider>;
}
