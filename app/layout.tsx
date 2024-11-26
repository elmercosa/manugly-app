import "@/styles/globals.css";

import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";

import { Providers } from "./providers";

const dm = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

const mono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
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
    <html lang="en" className="dark scroll-smooth">
      <body className={mono.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
