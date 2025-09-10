import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Nav from "./components/nav";
// import Footer from "./components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chloë Engel",
  description: "An archive of performance and art works by Chloe Engel, and a Calendar of upcoming events",
};

// Load the font
const openSans = Open_Sans({
  subsets: ["latin"],   // required
  variable: "--font-open-sans", // optional: CSS variable for Tailwind or custom usage
  display: "swap", // optional: control font-display
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;  
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased globalBody`}>
        <Nav />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
