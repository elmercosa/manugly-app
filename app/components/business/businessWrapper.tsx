"use client";

import { ReactNode } from "react";

import { BusinessProvider } from "@/app/contexts/business/context";

export default function BusinessWrapper({ children }: { children: ReactNode }) {
  return <BusinessProvider>{children}</BusinessProvider>;
}
