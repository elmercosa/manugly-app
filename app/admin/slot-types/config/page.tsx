import AllWrapper from "@/components/allWrapper";
import TopBar from "@/components/layout/private/topBar";
import Generator from "@/factory/generators/generator";

export default function Page() {
  return (
    <>
      <TopBar title="Configuración de los parámetros del usuario" />
      <main className="w-full mt-32">
        <AllWrapper>
          <Generator></Generator>
        </AllWrapper>
      </main>
    </>
  );
}
