"use client";

import Generator from "@/factory/generators/generator";

export default function CreateTemplate() {
  return (
    <div className="flex flex-col w-full gap-6 pb-10 h-full">
      <Generator></Generator>
    </div>
  );
}
