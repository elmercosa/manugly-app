import { ReactNode } from "react";

// import { Schema as CheckboxCustom } from "@/factory/types/checkbox/checkbox";
// import { Schema as Date } from "@/factory/types/date/date";
// import { Schema as Number } from "@/factory/types/number/number";
import { Schema as Text } from "@/factory/types/text/text";
// import { Schema as TextArea } from "@/factory/types/text/textarea";

interface Components {
  [key: string]: any;
}

// const types = [Text, Number, Date, TextArea, CheckboxCustom];
const types = [Text];

export class Parameters {
  private static instance: Parameters;
  public components: Components;
  private constructor() {
    this.components = {};
    types.forEach((type) => {
      this.components[type.type] = type;
    });
  }

  public static getInstance(): Parameters {
    if (!Parameters.instance) {
      Parameters.instance = new Parameters();
    }

    return Parameters.instance;
  }

  public getParameters() {
    return this.components;
  }
}
