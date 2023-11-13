import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddSlotForm from "@/components/slots/addSlot";

export default async function SessionWrapper() {
  const session = await getServerSession(authOptions);
  return <AddSlotForm session={session ?? undefined} />;
}
