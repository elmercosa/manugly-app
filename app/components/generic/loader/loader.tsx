import { CircularProgress } from "@nextui-org/react";

export function Loader({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-2 items-center justify-center w-full h-full ">
          <CircularProgress aria-label="Loading..." />
          <span>Cargando...</span>
        </div>
      ) : (
        children
      )}
    </>
  );
}
