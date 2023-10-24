"use client";
import Cookies from "js-cookie";

import Setter from "@/factory/generators/setter";

export default function Page({ params }: { params: { id: string } }) {
  const userId = params.id;
  const businessId = Cookies.get("businessId");

  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <Setter userId={userId} businessId={businessId} />
    </div>
  );
}
