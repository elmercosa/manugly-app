import BusinessWrapper from "@/components/business/businessWrapper";
import ParametersWrapper from "@/components/parameters/parametersWrapper";
import Setter from "@/factory/generators/setter";

export default function Page({ params }: { params: { id: string } }) {
  const userId = params.id;
  return (
    <main className="w-full">
      <BusinessWrapper>
        <ParametersWrapper>
          <Setter userId={userId} />
        </ParametersWrapper>
      </BusinessWrapper>
    </main>
  );
}
