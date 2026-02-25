'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
// import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useCurrentPath } from '@/hooks/useCurrentPath'
import { toCamelText } from '@/lib/helper'
import { GithubIcon, LinkedinIcon } from '@/lib/constants'

export function SiteHeader () {
  const { currentSegment } = useCurrentPath()
  const navTitle = toCamelText(currentSegment)

  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <h1 className='text-base font-medium'>{navTitle}</h1>

        <div className='ml-auto flex items-center gap-2'>
          {/* GitHub - Text for sm+, icon for <sm */}
          <Button variant='ghost' asChild size='sm' className='hidden sm:flex'>
            <a
              href='https://github.com/Jamaludin21'
              rel='noopener noreferrer'
              target='_blank'
              className='dark:text-foreground'
            >
              GitHub
            </a>
          </Button>
          <Button
            variant='ghost'
            asChild
            size='icon'
            className='flex sm:hidden'
          >
            <a
              href='https://github.com/Jamaludin21'
              rel='noopener noreferrer'
              target='_blank'
              aria-label='GitHub'
            >
              <GithubIcon className='h-5 w-5' />
            </a>
          </Button>

          {/* LinkedIn - Text for sm+, icon for <sm */}
          <Button variant='ghost' asChild size='sm' className='hidden sm:flex'>
            <a
              href='https://www.linkedin.com/in/jamaludin-hakim-harsoyo-5a86a2240'
              rel='noopener noreferrer'
              target='_blank'
              className='dark:text-foreground'
            >
              LinkedIn
            </a>
          </Button>
          <Button
            variant='ghost'
            asChild
            size='icon'
            className='flex sm:hidden'
          >
            <a
              href='https://www.linkedin.com/in/jamaludin-hakim-harsoyo-5a86a2240'
              rel='noopener noreferrer'
              target='_blank'
              aria-label='LinkedIn'
            >
              <LinkedinIcon className='h-5 w-5' />
            </a>
          </Button>

          {/* <ThemeToggle /> */}
        </div>
      </div>
    </header>
  )
}
