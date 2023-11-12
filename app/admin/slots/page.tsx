"use client";

import { BusinessProvider } from "@/app/contexts/business/context";
import { ParameterProvider } from "@/app/contexts/parameter/context";
import SlotsTable from "@/components/slots/slotsTable";

export default function Page() {
  return (
    <div className="flex flex-col w-full gap-6 pb-10 h-full">
      <ParameterProvider>
        <BusinessProvider>
          <SlotsTable></SlotsTable>
        </BusinessProvider>
      </ParameterProvider>
    </div>
  );
}
