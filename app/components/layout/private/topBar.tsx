import { IconBell, IconInfoCircle } from "@tabler/icons-react";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SelectorWrapper from "@/components/business/business-selector/wrapper";
import UserDropdown from "@/components/layout/user-dropdown";

import FeedBack from "./feedback";

export default async function TopBar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full transition-all flex items-center h-28 min-h-[7rem]">
      <div className="flex items-center justify-between gap-6 rounded-xl w-full h-full">
        <div className="flex flex-col h-full gap-1 justify-center">
          <h1 className="text-3xl font-bold text-neutral-700">Inicio</h1>
        </div>
        <div className="flex items-center justify-center h-auto gap-2">
          <FeedBack session={session ?? undefined} />
          <SelectorWrapper user={session?.user}></SelectorWrapper>
          <div className=" bg-white rounded-xl w-10 h-10 flex items-center justify-center">
            <IconBell size={18} />
          </div>
          <div className=" bg-white rounded-xl w-10 h-10 flex items-center justify-center">
            <IconInfoCircle size={18} />
          </div>
          <UserDropdown session={session ?? undefined} />
        </div>
      </div>
    </div>
  );
}
