import type { Metadata } from "next";
import { baskerville } from "./ui/fonts";
import Nav from "./components/nav";
import Footer from "./components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chloë Engel",
  description: "An archive of performance and art works by Chloe Engel, and a Calendar of upcoming events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;  
}>) {
  return (
    <html lang="en">
      <body className={`${baskerville.className} antialiased globalBody`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
