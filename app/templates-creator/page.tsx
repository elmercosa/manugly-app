import Generator from "@/factory/generators/generator";
export default function TemplatesCreator() {
  return (
    <div className="flex flex-col items-center w-full col-start-2 col-end-12">
      <h1 className="text-4xl font-semibold">Creador de plantillas</h1>
      <div className="grid grid-cols-3">
        <Generator type="2"></Generator>
      </div>
    </div>
  );
}
