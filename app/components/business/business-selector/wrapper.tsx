"use client";
import { useState } from "react";

import { useCount } from "@/app/contexts/business/context";

// import BusinessCreator from "./creator";
// import BusinessSelector from "./selector";

export default function SelectorWrapper({ user }: { user: any }) {
  const { state } = useCount();
  // return <BusinessSelector user={user} />;
  return <>{state.count}</>;
}
