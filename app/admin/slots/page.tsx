import AllWrapper from "@/components/allWrapper";
import Calendar from "@/components/calendar/calendar";
import TopBar from "@/components/layout/private/topBar";

export default function Page() {
  return (
    <main className="flex w-full">
      <AllWrapper>
        <div className="w-10/12 max-h-[calc(100vh-2rem)] overflow-y-hidden">
          <Calendar />
        </div>
      </AllWrapper>
    </main>
  );
}
