import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'About',  href: '#how-it-works' },
  { label: 'Docs',   href: '#flow'         },
  { label: 'GitHub', href: '#agents'       },
  { label: 'Terms',  href: '#launch'       },
]

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 py-10 px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left — logo + copyright */}
        <div className="flex items-center gap-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/assets/logo.png"
              alt="ClawMind"
              width={536}
              height={299}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <span className="font-inter text-xs text-secondary/50 tracking-wide">
            © 2026 ClawMind
          </span>
        </div>

        {/* Right — nav links */}
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-inter text-xs text-secondary/60 tracking-wide hover:text-secondary transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
