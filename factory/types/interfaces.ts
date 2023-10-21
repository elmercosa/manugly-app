import { ReactNode } from "react";

export interface ExportType {
  type: string;
  name: string;
  component: Function;
  configuration: Function;
}
