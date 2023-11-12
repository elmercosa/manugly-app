import BusinessWrapper from "@/components/business/businessWrapper";
import ParametersWrapper from "@/components/parameters/parametersWrapper";
import AddUserForm from "@/components/users/addForm";

export default function Page() {
  return (
    <main className="w-full">
      <BusinessWrapper>
        <ParametersWrapper>
          <AddUserForm />
        </ParametersWrapper>
      </BusinessWrapper>
    </main>
  );
}
