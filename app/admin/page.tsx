"use client";

import { Card, CardBody } from "@nextui-org/react";
import { IconUsersGroup } from "@tabler/icons-react";
import { AreaChart } from "@tremor/react";

export default function App() {
  const chartdata = [
    {
      date: "Jan 22",
      SemiAnalysis: 2890,
      "The Pragmatic Engineer": 2338,
    },
    {
      date: "Feb 22",
      SemiAnalysis: 2756,
      "The Pragmatic Engineer": 2103,
    },
    {
      date: "Mar 22",
      SemiAnalysis: 3322,
      "The Pragmatic Engineer": 2194,
    },
    {
      date: "Apr 22",
      SemiAnalysis: 3470,
      "The Pragmatic Engineer": 2108,
    },
    {
      date: "May 22",
      SemiAnalysis: 3475,
      "The Pragmatic Engineer": 1812,
    },
    {
      date: "Jun 22",
      SemiAnalysis: 3129,
      "The Pragmatic Engineer": 1726,
    },
  ];

  const valueFormatter = function (number: number) {
    return "$ " + new Intl.NumberFormat("us").format(number).toString();
  };
  return (
    <main className="flex flex-col w-full gap-8">
      <div className="grid grid-cols-3 gap-4">
        <Card className="w-full px-3 shadow-md bg-manugly rounded-xl">
          <CardBody className="py-5">
            <div className="flex gap-2.5">
              <IconUsersGroup size={24} stroke={1.5} color="white" />
              <div className="flex flex-col">
                <span className="text-white">Auto Insurance</span>
                <span className="text-xs text-white">1311 Cars</span>
              </div>
            </div>
            <div className="flex gap-2.5 py-2 items-center">
              <span className="text-xl font-semibold text-white">$45,910</span>
              <span className="text-xs text-success">+ 4.5%</span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div>
                  <span className="text-xs font-semibold text-success">
                    {"↓"}
                  </span>
                  <span className="text-xs text-white">100,930</span>
                </div>
                <span className="text-xs text-white">USD</span>
              </div>

              <div>
                <div>
                  <span className="text-xs font-semibold text-danger">
                    {"↑"}
                  </span>
                  <span className="text-xs text-white">54,120</span>
                </div>
                <span className="text-xs text-white">USD</span>
              </div>

              <div>
                <div>
                  <span className="text-xs font-semibold text-danger">
                    {"⭐"}
                  </span>
                  <span className="text-xs text-white">125</span>
                </div>
                <span className="text-xs text-white">VIP</span>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full px-3 transition-all shadow-md bg-manugly-green rounded-xl">
          <CardBody className="py-5">
            <div className="flex gap-2.5">
              <IconUsersGroup size={24} stroke={1.5} color="white" />
              <div className="flex flex-col">
                <span className="text-white">Auto Insurance</span>
                <span className="text-xs text-white">1311 Cars</span>
              </div>
            </div>
            <div className="flex gap-2.5 py-2 items-center">
              <span className="text-xl font-semibold text-white">$45,910</span>
              <span className="text-xs text-success">+ 4.5%</span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div>
                  <span className="text-xs font-semibold text-success">
                    {"↓"}
                  </span>
                  <span className="text-xs text-white">100,930</span>
                </div>
                <span className="text-xs text-white">USD</span>
              </div>

              <div>
                <div>
                  <span className="text-xs font-semibold text-danger">
                    {"↑"}
                  </span>
                  <span className="text-xs text-white">54,120</span>
                </div>
                <span className="text-xs text-white">USD</span>
              </div>

              <div>
                <div>
                  <span className="text-xs font-semibold text-danger">
                    {"⭐"}
                  </span>
                  <span className="text-xs text-white">125</span>
                </div>
                <span className="text-xs text-white">VIP</span>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full px-3 shadow-md bg-manugly-orange rounded-xl">
          <CardBody className="py-5">
            <div className="flex gap-2.5">
              <IconUsersGroup size={24} stroke={1.5} color="white" />
              <div className="flex flex-col">
                <span className="text-white">Card Insurance</span>
                <span className="text-xs text-white">1311 Cars</span>
              </div>
            </div>
            <div className="flex gap-2.5 py-2 items-center">
              <span className="text-xl font-semibold text-white">$3,910</span>
              <span className="text-xs text-danger">- 4.5%</span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div>
                  <span className="text-xs font-semibold text-danger">
                    {"↓"}
                  </span>
                  <span className="text-xs">100,930</span>
                </div>
                <span className="text-xs text-white">USD</span>
              </div>

              <div>
                <div>
                  <span className="text-xs font-semibold text-danger">
                    {"↑"}
                  </span>
                  <span className="text-xs">4,120</span>
                </div>
                <span className="text-xs text-white">USD</span>
              </div>

              <div>
                <div>
                  <span className="text-xs font-semibold text-danger">
                    {"⭐"}
                  </span>
                  <span className="text-xs">125</span>
                </div>
                <span className="text-xs text-white">VIP</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Gráfica</h2>
        <div className="flex p-6 bg-white rounded-xl">
          <AreaChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            categories={["SemiAnalysis", "The Pragmatic Engineer"]}
            colors={["violet", "blue"]}
            valueFormatter={valueFormatter}
          />
        </div>
      </div>
    </main>
  );
}
