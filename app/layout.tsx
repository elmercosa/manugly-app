import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

export const metadata = {
  title: "Manugly",
  description:
    "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  twitter: {
    card: "summary_large_image",
    title: "Precedent - Building blocks for your Next.js project",
    description:
      "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
    creator: "@steventey",
  },
  metadataBase: new URL("https://precedent.dev"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed w-full h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-indigo-950 dark:via-black dark:to-cyan-950" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex flex-col items-center justify-center w-full min-h-screen py-32">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
