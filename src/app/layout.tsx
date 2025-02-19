import type { Metadata } from "next";
import "./globals.css";
import { JSX, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Music App",
  description: "Top albums from iTunes API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
