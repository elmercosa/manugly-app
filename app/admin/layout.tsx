import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import SideNav from "@/components/layout/private/sideNav";
import TopBar from "@/components/layout/private/topBar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mini = false;
  return (
    <main className="flex h-screen max-h-screen p-4 bg-gray-100">
      <SideNav mini={mini}></SideNav>
      <div
        className={`flex flex-col max-h-screen col-start-3 col-end-13 pl-10 pr-6 overflow-y-auto ${
          mini ? "w-11/12" : "w-10/12"
        }`}
      >
        <TopBar></TopBar>
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
        />
        <div className="flex justify-center w-full">{children}</div>
      </div>
    </main>
  );
}
