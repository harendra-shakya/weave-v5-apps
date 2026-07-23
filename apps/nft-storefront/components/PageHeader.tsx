'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCollection } from '@/lib/collection'
import { Wordmark } from './Wordmark'

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={
        'rounded-full px-4 py-2 text-[13.5px] font-extrabold no-underline transition-colors ' +
        (active ? 'bg-accent-soft text-accent' : 'text-muted hover:text-ink')
      }
    >
      {children}
    </Link>
  )
}

export function PageHeader() {
  const pathname = usePathname()
  const { entries } = useCollection()
  return (
    <header>
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-6 px-6 py-5 sm:px-8">
        <Wordmark />
        <nav aria-label="Main" className="flex flex-wrap items-center gap-2">
          <NavLink href="/" active={pathname === '/' || pathname.startsWith('/editions')}>
            The shop
          </NavLink>
          <NavLink href="/collection" active={pathname.startsWith('/collection')}>
            {entries.length > 0 ? 'My Vitrine · ' + entries.length : 'My Vitrine'}
          </NavLink>
          <NavLink href="/about" active={pathname === '/about'}>
            Our story
          </NavLink>
          <NavLink href="/maker" active={pathname.startsWith('/maker')}>
            Open a stall
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
