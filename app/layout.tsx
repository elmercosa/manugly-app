import "@/styles/globals.css";

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { Providers } from "./providers";

const dm = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manugly",
  description: "Manugly",
  icons: "/manugly.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light scroll-smooth">
      <body className={dm.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
