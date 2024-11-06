import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Space_Grotesk } from 'next/font/google';

export const metadata: Metadata = {
  title: "David Breton",
  description: "David Breton personal website",
  icons: {
    icon: "./icons/favicon.ico",
    apple: "./icons/apple-touch-icon.png",
  }
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  variable: '--font-space-grotesk',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
