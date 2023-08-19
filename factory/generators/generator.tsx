"use client";
import { ReactNode } from "react";
import { Parameters } from "@/factory/types/parameters";

export default function Generator({ type }: { type: string }) {
  const parameters = Parameters.getInstance().getParameters();
  console.log("paramaters :>> ", typeof parameters);
  return (
    <div>
      {Object.values(parameters).map((parameter: any) => {
        return (
          <div key={parameter.name}>
            <parameter.component></parameter.component>
          </div>
        );
      })}
    </div>
  );
}
