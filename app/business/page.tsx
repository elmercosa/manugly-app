import Image from "next/image";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BusinessSelector from "@/components/business/business-selector/selector";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user || [];
  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen gap-10 bg-white dark:bg-neutral-950">
      <div className="flex flex-col items-center justify-center gap-4 text-5xl font-bold">
        <Image src="/manugly.svg" alt="Manugly" width={300} height={100} />
        <span>Manugly</span>
      </div>
      <BusinessSelector user={user} />
    </div>
  );
}
