'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useClientReady } from '@/hooks/useClientReady'

export function ThemeToggle ({ loginPage = false }) {
  const { theme, setTheme } = useTheme()
  const isReady = useClientReady()

  if (!isReady) return null

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label='Toggle theme'
      className={`${loginPage ? 'hover:bg-black' : ''}`}
    >
      {theme === 'dark' ? (
        <Sun className='h-[1.2rem] w-[1.2rem]' />
      ) : (
        <Moon
          className={`h-[1.2rem] w-[1.2rem] ${loginPage ? 'text-white' : ''}`}
        />
      )}
    </Button>
  )
}
