import type { Metadata } from "next";
import "./globals.css";
import { Hanken_Grotesk } from 'next/font/google';
import { FloatingNav } from './components/FloatingNav';

export const metadata: Metadata = {
  title: "David Breton",
  description: "Computer engineer building software that ships — from co-founding a startup to production systems at Autodesk.",
  icons: {
    icon: "./icons/favicon.ico",
    apple: "./icons/apple-touch-icon.png",
  }
};

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800'],
  variable: '--font-hanken-grotesk',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={hankenGrotesk.variable}>
      <body>
        {children}
        <FloatingNav />
      </body>
    </html>
  );
}
