'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ThemeToggle } from '@/components/landing/toggle/theme-toggle'

// const navItems = [
//   { label: 'Home', href: '#home' },
//   { label: 'Product', href: '#product' },
//   { label: 'About', href: '#about' },
//   { label: 'Contact', href: '#contact' }
// ]

export function NavbarLanding () {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 z-50 px-6 w-full backdrop-blur-sm dark:bg-black/60'
      )}
    >
      <div className='container flex h-16 items-center justify-between'>
        {/* Logo */}
        <Link href='/home' className='text-lg font-bold '>
          James Dev
        </Link>

        {/* Navigation */}
        {/* <div className='hidden items-center gap-6 md:flex'>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              {item.label}
            </Link>
          ))}
        </div> */}

        {/* Actions */}
        <div className='flex items-center gap-2'>
          <Link href='/login'>
            <Button variant='outline' size='sm'>
              Manage content
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  )
}
