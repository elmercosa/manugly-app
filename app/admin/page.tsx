import { Card, CardBody } from "@nextui-org/react";
import { IconUsersGroup } from "@tabler/icons-react";
import { AreaChart } from "@tremor/react";

import TopBar from "@/components/layout/private/topBar";

export default function App() {
  return (
    <>
      <TopBar title="Inicio" />
      <main className="flex flex-col w-full gap-8 mt-32"></main>
    </>
  );
}
