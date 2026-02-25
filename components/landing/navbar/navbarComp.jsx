'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
// import { ThemeToggle } from '@/components/ui/theme-toggle'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'About me', href: '/about' },
  { label: 'Portfolio', href: '/portofolio' },
  { label: 'Contact', href: '/contact' }
]

export function NavbarLanding () {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(prev => !prev)

  return (
    <React.Fragment>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='fixed top-0 z-50 w-full px-6 backdrop-blur-sm dark:bg-black/60 bg-white/70 shadow-sm'
      >
        <div className='flex h-16 items-center justify-between max-w-7xl mx-auto'>
          {/* Logo */}
          <Link
            href='/home'
            className='flex items-center gap-2.5 hover:opacity-80 transition-opacity'
          >
            <Image
              src='https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/assets/jd_logo_1024-55NCd59VtjrIiVx4yHYL4Qa3gCdoak.jpg'
              alt='James Dev Logo'
              width={36}
              height={36}
              className='rounded-full object-cover shadow-sm border border-border'
              priority
            />
            <span className='text-lg font-bold'>James Dev</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className='hidden md:flex'>
            <NavigationMenuList>
              {navItems.map(item => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    active={pathname === item.href}
                    className={cn(
                      'text-sm font-medium transition-colors px-3 py-2 cursor-pointer',
                      pathname === item.href
                        ? 'bg-accent/50 text-primary'
                        : 'text-muted-foreground hover:text-primary hover:bg-accent'
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className='flex items-center gap-2'>
            <div className='hidden md:block'>
              <Link href='/login'>
                <Button variant='outline' size='sm'>
                  Manage content
                </Button>
              </Link>
            </div>
            {/* <ThemeToggle /> */}
            {/* Mobile menu toggle */}
            <Button
              className='md:hidden p-2'
              onClick={toggleMenu}
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className='md:hidden fixed top-16 left-0 w-full bg-white dark:bg-black px-6 py-4 z-40 shadow-lg'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <nav className='flex flex-col gap-4'>
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'text-base font-medium',
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <Link href='/login'>
                <Button variant='outline' size='sm' className='w-full mt-4'>
                  Manage content
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  )
}
