import { IconRobotFace } from "@tabler/icons-react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BusinessSelector from "@/components/business/business-selector/selector";
import BusinessWrapper from "@/components/business/businessWrapper";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user || [];
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen gap-10 bg-white">
      <div className="flex items-center justify-center gap-1 text-6xl font-bold text-emerald-600">
        <IconRobotFace size={60} />
        <span className="tracking-tighter">Manugly</span>
      </div>
      <BusinessWrapper>
        <BusinessSelector user={user} />
      </BusinessWrapper>
    </div>
  );
}
