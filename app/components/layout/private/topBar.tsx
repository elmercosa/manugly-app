import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserDropdown from "@/components/layout/user-dropdown";

import FeedBack from "./feedback";

export default async function TopBar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full transition-all flex items-center h-28 min-h-[7rem]">
      <div className="flex items-center justify-between w-full h-full gap-6 rounded-xl">
        <div className="flex flex-col justify-center h-full gap-1">
          <h1 className="text-3xl font-bold text-neutral-700">Inicio</h1>
        </div>
        <div className="flex items-center justify-center h-auto gap-2">
          <FeedBack session={session ?? undefined} />
          <UserDropdown session={session ?? undefined} />
        </div>
      </div>
    </div>
  );
}
