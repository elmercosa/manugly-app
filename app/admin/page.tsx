"use client";
import { createContext, useContext } from "react";

import SelectorContainer from "@/components/business/business-selector/container";
import { CountProvider } from "@/contexts/business/context";

// const CustomContext = createContext({
//   name: "Manugly",
//   prueba: {
//     name: "Borja",
//     surname: "Rodríguez",
//   },
// });

export default function App() {
  // const context = useContext(CustomContext);
  return (
    <main className="grid min-h-screen grid-cols-12 pt-20 bg-[#F3F2F0]">
      <CountProvider>
        <SelectorContainer />
      </CountProvider>

      {/* <CustomContext.Provider value={{}}>
        <div className="col-span-10">Hola</div>
      </CustomContext.Provider> */}
    </main>
  );
}
