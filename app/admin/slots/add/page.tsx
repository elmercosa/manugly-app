import BusinessWrapper from "@/components/business/businessWrapper";
import AddSlotForm from "@/components/slots/addSlot";
import SessionWrapper from "@/components/slots/sessionWrapper";

export default function Page() {
  return (
    <main className="w-full">
      <BusinessWrapper>
        <SessionWrapper></SessionWrapper>
      </BusinessWrapper>
    </main>
  );
}
