'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/landing/toggle/theme-toggle'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu' // adjust path as needed

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'About me', href: '/about' },
  { label: 'Portfolio', href: '/portofolio' },
  { label: 'Contact', href: '/contact' }
]

export function NavbarLanding () {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 z-50 px-6 w-full backdrop-blur-sm dark:bg-black/60'
      )}
    >
      <div className='flex h-16 items-center justify-between'>
        {/* Logo */}
        <Link href='/home' className='text-lg font-bold'>
          James Dev
        </Link>

        {/* Navigation Menu */}
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
