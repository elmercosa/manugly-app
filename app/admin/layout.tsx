import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import SideNav from "@/components/layout/private/sideNav";

export const metadata: Metadata = {
  title: "Manugly",
  description: "Manugly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mini = false;
  return (
    <main className="flex h-screen max-h-screen p-4 bg-manugly-grey-light">
      <SideNav mini={mini}></SideNav>
      <div
        className={`flex flex-col max-h-screen col-start-3 col-end-13 pl-10 pr-6 overflow-y-auto ${
          mini ? "w-11/12" : "w-[88vw]"
        }`}
      >
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="!rounded-xl"
        />
        <div className="relative flex flex-col justify-center w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
