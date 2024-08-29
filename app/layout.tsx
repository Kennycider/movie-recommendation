import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Image from "next/image";

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
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-[100vh] lg:h-[80vh] min-h-[500px] overflow-hidden">
            <Image
              src="/images/HeroBanner.jpg"
              alt="Hero Banner"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="relative z-10 bg-[#0000006a] min-h-screen">
            <Header />
            <Container>
              {children}
            </Container>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}