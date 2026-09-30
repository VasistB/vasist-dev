import React, { useRef, useState } from 'react'

export function GlassButton({
  children,
  className = '',
  href,
  onClick,
  as,
  target,
  rel,
  variant = 'secondary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  glow = true,
  ...props
}) {
  const buttonRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handlePointerDown = (e) => {
    const button = buttonRef.current
    if (!button) return

    const ripple = document.createElement('span')
    ripple.classList.add('ripple')

    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    button.appendChild(ripple)

    ripple.addEventListener('animationend', () => {
      ripple.remove()
    })

    if (onClick) onClick(e)
  }

  const handleMouseMove = (e) => {
    if (!glow || !buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y, opacity: 1 })
  }

  const handleMouseLeave = () => {
    if (!glow) return
    setMousePos((prev) => ({ ...prev, opacity: 0 }))
  }

  const Component = as || (href ? 'a' : 'button')

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-white/20 hover:border-white/40 shadow-blue-500/25 hover:shadow-blue-500/40',
    secondary:
      'bg-white/[0.06] hover:bg-white/[0.12] text-white border-white/10 hover:border-white/30 shadow-black/20',
    outline:
      'bg-transparent hover:bg-white/[0.05] text-slate-200 hover:text-white border-white/20 hover:border-white/40',
    ghost:
      'bg-transparent hover:bg-white/[0.08] text-slate-300 hover:text-white border-transparent'
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5 font-medium',
    md: 'px-5 py-2.5 text-xs sm:text-sm rounded-xl gap-2 font-medium',
    lg: 'px-6 py-3.5 text-sm sm:text-base rounded-2xl gap-2.5 font-semibold'
  }

  return (
    <Component
      ref={buttonRef}
      href={href}
      target={target}
      rel={rel}
      onPointerDown={handlePointerDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-button group transition-all duration-300 active:scale-95 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 outline-none select-none ${variantStyles[variant] || variantStyles.secondary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {/* Interactive Radial Glow Layer */}
      {glow && (
        <span
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(120px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.25), transparent 80%)`
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-[inherit]">
        {children}
      </span>
    </Component>
  )
}

export default GlassButton
