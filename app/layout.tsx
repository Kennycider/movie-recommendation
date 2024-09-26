import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AOS from "@/components/AOS"
import { Suspense } from "react";
import ClientSideScrollRestorer from "@/components/ClientSideScrollRestorer";
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/providers"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Recommendation",
  description: "This is a movie recommendation system for a user based on his preferences and history",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-lightBlack`}>
        <AOS />
        <Toaster />
        <Suspense>
          <ClientSideScrollRestorer />
        </Suspense>
        
        <AuthProvider>
          <Header />
        </AuthProvider>
          {children}
        <Footer />
      </body>
    </html>
  );
}