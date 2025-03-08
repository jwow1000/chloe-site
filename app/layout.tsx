import type { Metadata } from "next";
import { spaceGrotesk } from "./ui/fonts";
import { SanityLive } from "@/sanity/live";
import Nav from "./components/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chloe Engel official website",
  description: "An archive of past works by Chloe Engel, and a Calendar of upcoming events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased`}>
        <Nav />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
