import { CircularProgress } from "@nextui-org/react";

export function PageLoader({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 flex flex-col gap-2 items-center justify-center w-full h-full z-50 bg-white/30 backdrop-blur">
          <CircularProgress aria-label="Loading..." />
          <span>Guardando...</span>
        </div>
      )}
    </>
  );
}
