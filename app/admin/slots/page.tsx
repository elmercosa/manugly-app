import AllWrapper from "@/components/allWrapper";
import Calendar from "@/components/calendar/calendar";
import TopBar from "@/components/layout/private/topBar";

export default function Page() {
  return (
    <>
      <TopBar title="Citas" />
      <main className="flex w-full mt-32">
        <AllWrapper>
          <Calendar />
        </AllWrapper>
      </main>
    </>
  );
}
