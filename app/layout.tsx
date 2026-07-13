import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
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
    <html lang="en" className="max-w-[100vw]">
      <body
        className={`antialiased w-full bg-bg text-fg font-sans text-[12pt]`}
      >
        {children}
      </body>
    </html>
  );
}
