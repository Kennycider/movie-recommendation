import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

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
      <body className={`${inter.className} bg-[url('/images/HeroBanner.jpg')] bg-cover bg-no-repeat backdrop-blur-sm`}>
        <div className="absolute top-0 left-0 bg-[#0000006a] min-h-[calc(100vh+5rem)] w-full"></div>
        <Header />
        <Container>
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
