import { CircularProgress } from "@nextui-org/react";

export function Loader({
  children,
  isLoading,
  text,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  text?: string;
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <CircularProgress aria-label="Loading..." />
          <span>{text ?? "Cargando..."}</span>
        </div>
      ) : (
        children
      )}
    </>
  );
}
