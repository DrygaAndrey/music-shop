import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
//PADLA

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={robotoCondensed.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}


