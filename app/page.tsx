import React from "react";

import Footer from "@/components/layout/footer";

import NavBar from "./components/layout/navbar";
("@/components/layout/navbar");

export default function App() {
  return (
    <>
      <NavBar></NavBar>
      <main className="grid min-h-screen grid-cols-12 pt-20"></main>
      <Footer></Footer>
    </>
  );
}
