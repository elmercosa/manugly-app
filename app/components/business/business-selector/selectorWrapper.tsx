import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import BusinessCreator from "./creator";
import BusinessSelector from "./selector";

export default async function SelectorWrapper() {
  const session = await getServerSession(authOptions);
  const user = session?.user || [];
  const businesses = user.businesses ? Object.values(user.businesses) : [];
  return (
    <>
      {businesses.length ? (
        <BusinessSelector user={user} />
      ) : (
        <BusinessCreator user={user} />
      )}
    </>
  );
}
