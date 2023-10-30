"use client";

import { BusinessProvider } from "@/app/contexts/business/context";

import BusinessSelector from "./selector";

export default function SelectorWrapper({ user }: { user: any }) {
  return <BusinessProvider>
  <BusinessSelector user={user} />
 </BusinessProvider>;
}
