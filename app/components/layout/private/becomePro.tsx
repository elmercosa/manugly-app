import { Button, Link, Tooltip } from "@nextui-org/react";
export default function BecomePro({ mini }: { mini?: boolean }) {
  return (
    <>
      {mini ? (
        <Tooltip content="Conviertete en PRO" placement="right" showArrow>
          <Link
            className="flex items-center justify-center text-xl font-bold text-white rounded-full w-9 h-9 bg-manugly"
            href="#"
          >
            M
          </Link>
        </Tooltip>
      ) : (
        <div className="relative flex w-full px-8 pt-10 pb-5 shadow-md rounded-3xl bg-manugly">
          <div className="absolute top-0 flex items-center justify-center w-16 h-16 text-2xl font-bold text-white -translate-x-1/2 -translate-y-1/2 border-white rounded-full border-5 left-1/2 bg-manugly">
            M
          </div>
          <div className="flex flex-col w-full gap-4 text-center">
            <h2 className="text-xl font-bold text-white">Actualiza a PRO</h2>
            <p className="text-sm font-semibold text-white">
              ¿Quieres desbloquear todo lo que ofrece Manugly?
            </p>
            <Button className="font-bold bg-white border-none text-primary hover:bg-gray-50 hover:text-primary">
              Conviertete en PRO
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
