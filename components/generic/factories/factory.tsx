import { ReactNode } from "react";

import { TextName, Text } from "./text/text";
import { NumberName, Number } from "./number/number";

interface Components {
  [key: string]: any;
}

const components: Components = {
  [TextName]: Text,
  [NumberName]: Number,
};

export default function Factory({ type }: { type: string }) {
  const Componente = components[type];
  return <Componente />;
}
