import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserDropdown from "@/components/layout/user-dropdown";

import FeedBack from "./feedback";

export default async function TopBar({ title }: { title: string }) {
  const session = await getServerSession(authOptions);
  return (
    <div className="absolute top-0 left-0 flex items-center justify-between w-full p-5 transition-all bg-white rounded-xl">
      <div className="flex flex-col justify-center h-full gap-1">
        <h1 className="text-3xl font-bold text-neutral-700">{title}</h1>
      </div>
      <div className="flex items-center justify-center h-auto gap-4">
        <FeedBack session={session ?? undefined} />
        <UserDropdown session={session ?? undefined} />
      </div>
    </div>
  );
}
