import { ExportType } from "@/factory/types/ interfaces";

export const name = "Date";

export function Date() {
  return (
    <input
      type="date"
      name="date"
      id="date"
      placeholder=""
      className="w-full rounded-lg"
    />
  );
}

export const Schema: ExportType = {
  name,
  component: Date,
};
