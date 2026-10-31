import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getSiteSettings } from "@/lib/api";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ignitelearningacademy.in"),
  title: "Ignite Learning Academy | Premier Teacher Training Institute",
  description:
    "Government-certified Nursery Teacher Training (NTT) Diploma, Montessori workshops, and child psychology training in Bangalore.",
  alternates: {
    canonical: "https://ignitelearningacademy.in",
  },
  openGraph: {
    title: "Ignite Learning Academy | Premier Teacher Training Institute",
    description:
      "Government-certified Nursery Teacher Training (NTT) Diploma, Montessori workshops, and child psychology training in Bangalore.",
    url: "https://ignitelearningacademy.in",
    siteName: "Ignite Learning Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();
  const whatsappNumber = siteSettings?.whatsappNumber
    ? String(siteSettings.whatsappNumber).replace(/[^0-9]/g, "")
    : undefined;

  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col bg-white text-[#6F6864] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton initialNumber={whatsappNumber} />
      </body>
    </html>
  );
}
