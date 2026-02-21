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
  title: "ClawMind | The Brain of Autonomous Commerce",
  description:
    "ClawMind is the orchestration intelligence layer that plans tasks, executes x402 payments, and composes results into autonomous economic workflows.",
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
