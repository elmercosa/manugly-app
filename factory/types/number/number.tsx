import { ExportType } from "@/factory/types/interfaces";

const name = "Number";

export function Number() {
  return (
    <input
      type="number"
      name="number"
      id="number"
      placeholder="Número"
      className="w-full rounded-lg"
    />
  );
}

export const Schema: ExportType = {
  name,
  component: Number,
};
