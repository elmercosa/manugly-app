import { IconBell, IconInfoCircle } from "@tabler/icons-react";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BreadCrumbs from "@/components/layout/private/breadCrumbs";
import UserDropdown from "@/components/layout/user-dropdown";

import SearchBar from "./searchBar";

export default async function TopBar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 right-0 w-[85%] max-w-[85%] transition-all flex flex-col border-r-[1px]">
      <div className="flex justify-between gap-6 p-4 m-6 rounded-xl">
        <div className="flex flex-col h-full gap-1 pl-4">
          <BreadCrumbs></BreadCrumbs>
          <h1 className="text-4xl font-bold text-neutral-700">Inicio</h1>
        </div>
        <div className="flex items-center justify-center h-auto gap-2 p-3 bg-white rounded-full shadow-md">
          <SearchBar></SearchBar>
          <IconBell size={40} />
          <IconInfoCircle size={40} />
          <UserDropdown session={session} />
        </div>
      </div>
    </div>
  );
}
