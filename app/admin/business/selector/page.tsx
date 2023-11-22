import Image from "next/image";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BusinessSelector from "@/components/business/business-selector/selector";
import BusinessWrapper from "@/components/business/businessWrapper";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user || [];
  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen gap-10 bg-white">
      <div className="flex items-center justify-center gap-1 text-6xl font-bold text-emerald-600">
        <Image
          src="/manugly-logo-text.svg"
          alt="Manugly"
          width={300}
          height={100}
        />
      </div>
      <BusinessWrapper>
        <BusinessSelector user={user} />
      </BusinessWrapper>
    </div>
  );
}
