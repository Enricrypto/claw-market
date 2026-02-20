import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import MotionProvider from "@/components/MotionProvider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Claw Market | Autonomous Capital Infrastructure",
  description:
    "A distributed network of intelligent agents coordinating liquidity, execution, and strategy across decentralized markets.",
  icons: {
    icon: "/assets/favicon.ico"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <body className='font-inter antialiased bg-background text-primary'>
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
