import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";

import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";

import "./globals.css";
import getMainCategories from "@/functions/getMainCategories";


const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music shop",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getMainCategories();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={robotoCondensed.className}>
        <Header categories={categories} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
export const revalidate = 10; // Regenerate the page every hour


