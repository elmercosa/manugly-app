import { Button } from "@nextui-org/react";
export default function BecomePro() {
  return (
    <div className="relative flex w-full px-8 pt-10 pb-5 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md">
      <div className="absolute top-0 flex items-center justify-center w-16 h-16 text-2xl font-bold text-white -translate-x-1/2 -translate-y-1/2 border-white rounded-full border-5 left-1/2 bg-emerald-500">
        M
      </div>
      <div className="flex flex-col w-full gap-4 text-center">
        <h2 className="text-xl font-bold text-white">Actualiza a PRO</h2>
        <p className="text-sm font-semibold text-white">
          ¿Quieres desbloquear todo lo que ofrece Manugly?
        </p>
        <Button className="font-bold bg-white text-emerald-600 hover:bg-gray-100 hover:text-emerald-500">
          Conviertete en PRO
        </Button>
      </div>
    </div>
  );
}
