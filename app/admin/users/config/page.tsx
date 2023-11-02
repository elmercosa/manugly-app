"use client";

import { BusinessProvider } from "@/app/contexts/business/context";
import { ParameterProvider } from "@/app/contexts/parameter/context";
import Generator from "@/factory/generators/generator";

export default function CreateTemplate() {
  return (
    <div className="flex flex-col w-full gap-6 pb-10 h-full">
      <ParameterProvider>
        <BusinessProvider>
          <Generator></Generator>
        </BusinessProvider>
      </ParameterProvider>
    </div>
  );
}
