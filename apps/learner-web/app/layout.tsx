import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_JP, Plus_Jakarta_Sans } from "next/font/google";
import "@nekoru/design-tokens/tokens.css";
import "./globals.css";

const ui = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});
const japanese = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-ja",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Nekoru · Prototype U01-L1",
  description: "Prototype internal fondasi belajar bahasa Jepang",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${ui.variable} ${japanese.variable}`}>
      <body>{children}</body>
    </html>
  );
}
