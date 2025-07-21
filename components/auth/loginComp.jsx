'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { useClientReady } from '@/hooks/useClientReady'
import { useState } from 'react'

export function LoginForm ({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false)
  const isClientReady = useClientReady()

  if (!isClientReady) return null

  return (
    <motion.div
      className={cn('flex flex-col gap-6', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isClientReady ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      {...props}
    >
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-bold'>Welcome back</h1>
                <p className='text-muted-foreground text-balance'>
                  Login to your portofolio panel management account
                </p>
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='account@gmail.com'
                  required
                />
              </div>

              <div className='grid gap-3'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='#'
                    className='text-sm underline-offset-2 hover:underline'
                  >
                    Forgot your password?
                  </a>
                </div>

                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder='Your password'
                    className='pr-10'
                  />
                  <Button
                    variant='ghost'
                    onClick={() => setShowPassword(prev => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none'
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </div>

              <div className='text-center text-sm'>
                <Link href='/home'>
                  <Button variant='link' className='w-full'>
                    <ArrowLeftIcon /> Back to homepage
                  </Button>
                </Link>
              </div>
            </div>
          </form>

          <div className='bg-muted relative hidden md:block'>
            <Image
              src='https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/assets/tree-8175062_1280-4EsCdIQovDFE4pBueAoX0WihX5Ppzl.jpg'
              alt='Login page'
              fill
              priority
              sizes='(min-width: 1024px) 176px, (min-width: 640px) 160px, 100vw'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
