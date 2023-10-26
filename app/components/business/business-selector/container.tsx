import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import SelectorWrapper from "./wrapper";

export default async function SelectorContainer() {
  const session = await getServerSession(authOptions);
  const user = session?.user || [];
  return <SelectorWrapper user={user} />;
}
