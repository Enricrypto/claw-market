import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 h-16 border-b border-white/5 bg-background/75 backdrop-blur-md">
      <Link href="/" className="flex items-center shrink-0">
        <Image
          src="/assets/logo.png"
          alt="ClawMind"
          width={536}
          height={299}
          className="h-11 w-auto object-contain"
          priority
        />
      </Link>

      <nav className="flex items-center gap-3 sm:gap-8">
        <a
          href="#how-it-works"
          className="hidden sm:block font-inter text-[11px] font-medium text-secondary tracking-[0.12em] uppercase hover:text-primary transition-colors duration-200"
        >
          How It Works
        </a>
        <a
          href="#agents"
          className="hidden sm:block font-inter text-[11px] font-medium text-secondary tracking-[0.12em] uppercase hover:text-primary transition-colors duration-200"
        >
          Agents
        </a>
        <a
          href="#launch"
          className="font-inter text-[11px] font-semibold text-accent tracking-[0.12em] uppercase border border-accent/30 px-4 py-1.5 rounded-sm hover:bg-accent/10 transition-colors duration-200"
        >
          Launch
        </a>
      </nav>
    </header>
  )
}
