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
        <div className="flex flex-col items-center justify-center gap-2">
          <CircularProgress aria-label="Loading..." />
          <span>Cargando...</span>
        </div>
      ) : (
        children
      )}
    </>
  );
}
