import { ExportType } from "@/factory/types/interfaces";

export const name = "Text";

export function Text() {
  return (
    <input
      type="text"
      name="text"
      id="text"
      placeholder="Texto corto"
      className="w-full rounded-lg"
    />
  );
}

export const Schema: ExportType = {
  name,
  component: Text,
};
