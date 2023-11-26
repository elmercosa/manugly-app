import AllWrapper from "@/components/allWrapper";
import TopBar from "@/components/layout/private/topBar";
import EditUserForm from "@/components/users/editUser";

export default function Page({ params }: { params: { id: string } }) {
  const userId = params.id;
  return (
    <>
      <TopBar title="Editar usuario" />
      <main className="w-full mt-32">
        <AllWrapper>
          <EditUserForm userId={userId} />
        </AllWrapper>
      </main>
    </>
  );
}
