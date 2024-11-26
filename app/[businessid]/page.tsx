import TopBar from "@/components/layout/private/topBar";
import { getPrivate } from "@/services/request";

interface Business {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  colour: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: Object;
}

export default async function Page({
  params,
}: {
  params: { businessid: string };
}) {
  const business = await getPrivate(
    `/businesses/findById/${params.businessid}`,
  );

  console.log("business :>> ", business);
  return (
    <>
      <TopBar title="Inicio" />
      <main className="flex flex-col w-full gap-8 mt-32"></main>
    </>
  );
}
