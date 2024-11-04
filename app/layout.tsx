"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import StoreUserId from "@/components/StoreUserId";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <StoreUserId />
          <Navbar />
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
