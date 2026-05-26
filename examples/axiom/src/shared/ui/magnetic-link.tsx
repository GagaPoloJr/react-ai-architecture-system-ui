import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticLinkProps {
  children: ReactNode
  href: string
  className?: string
}

export function MagneticLink({ children, href, className }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null!)

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  function onLeave() {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    })
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ willChange: 'transform' }}
    >
      {children}
    </a>
  )
}
