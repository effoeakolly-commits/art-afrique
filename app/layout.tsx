import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "N'KORA — L'art africain, autrement",
  description:
    "Plateforme dédiée aux arts africains contemporains et traditionnels, galeries virtuelles, expositions immersives 3D et ateliers d'artistes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#F6F2E7] text-[#2F241A]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartModal />
      </body>
    </html>
  );
}