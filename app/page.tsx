import React from "react";

import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";

export default function App() {
  return (
    <>
      <Nav></Nav>
      <main className="grid min-h-screen grid-cols-12 pt-20"></main>
      <Footer></Footer>
    </>
  );
}