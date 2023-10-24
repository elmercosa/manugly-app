import { IconBell, IconInfoCircle } from "@tabler/icons-react";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BreadCrumbs from "@/components/layout/private/breadCrumbs";
import UserDropdown from "@/components/layout/user-dropdown";

import SearchBar from "./searchBar";

export default async function TopBar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 right-0 z-50 pl-64 w-full transition-all flex items-center border-r-[1px] h-32 max-h-[32] ">
      <div className="flex items-center justify-between gap-6 px-10 rounded-xl w-full  h-full">
        <div className="flex flex-col h-full gap-1 justify-center">
          <BreadCrumbs></BreadCrumbs>
          <h1 className="text-4xl font-bold text-neutral-700">Inicio</h1>
        </div>
        <div className="flex items-center justify-center h-auto gap-2 p-2 bg-white rounded-full shadow-md">
          <SearchBar></SearchBar>
          <IconBell size={20} />
          <IconInfoCircle size={20} />
          <UserDropdown session={session} />
        </div>
      </div>
    </div>
  );
}
