import type { Metadata } from "next"
import { Inter, Barlow_Condensed } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lorem Ipsum Service SRL — Service Auto București | Certificat RAR",
  description:
    "Service auto premium în București din 1992. Revizii, aer condiționat, diagnoză, eșapament, sudură argon, off-road. Manoperă garantată, piese cu garanție 18 luni.",
  generator: "v0.app",
  keywords: [
    "service auto bucurești",
    "revizii auto",
    "aer condiționat auto",
    "diagnoză computerizată",
    "reparații eșapament",
    "sudură argon",
    "RAR",
  ],
}

export const viewport = {
  themeColor: "#FF5A1F",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" className={`${inter.variable} ${barlow.variable} bg-background`}>
      <body className="font-sans antialiased text-foreground">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
