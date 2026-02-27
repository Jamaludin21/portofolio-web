'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useClientReady } from '@/hooks/useClientReady'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { useAuth } from '@/hooks/useAuth'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from 'sonner'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function LoginForm ({ className, ...props }) {
  useDocumentTitle('Login')
  const [showPassword, setShowPassword] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const isClientReady = useClientReady()
  const { login, loading } = useAuth()

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async values => {
    setAlertMessage('')
    const toastId = toast.loading('Logging in...')

    try {
      const res = await login(values.email, values.password)

      if (res?.error) {
        form.setError('password', { message: res.error })
        setAlertMessage(res.error)
        toast.error(res.error, { id: toastId })
      } else {
        toast.success('Login successful! Redirect into panel management', {
          id: toastId
        })
      }
    } catch (error) {
      toast.error('Something went wrong.', { id: toastId })
    }
  }

  if (!isClientReady) return null

  return (
    <motion.div
      className={cn('flex flex-col gap-6', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isClientReady ? 1 : 0, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      {...props}
    >
      <Card className='overflow-hidden p-0 shadow-xl border-border'>
        <CardContent className='grid relative p-0 md:grid-cols-2 min-h-[500px]'>
          {/* ✅ Theme toggle for Mobile (Restored and fixed positioning) */}
          <div className='absolute right-4 top-4 z-20 md:hidden'>
            <ThemeToggle loginPage={true} />
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='p-6 sm:p-8 md:p-10 flex flex-col justify-center'
            >
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center space-y-2 mb-2'>
                  <h1 className='text-3xl font-extrabold tracking-tight text-foreground'>
                    Welcome back
                  </h1>
                  <p className='text-sm text-muted-foreground text-balance leading-relaxed'>
                    Login to your portfolio panel management account
                  </p>
                </div>

                {alertMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Alert variant='destructive' className='mb-2'>
                      <AlertTitle>Login Failed</AlertTitle>
                      <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <FormField
                  name='email'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-foreground font-medium'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='account@gmail.com'
                          required
                          disabled={loading}
                          className='h-11 transition-all focus-visible:ring-primary shadow-sm'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name='password'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center justify-between'>
                        <FormLabel className='text-foreground font-medium'>
                          Password
                        </FormLabel>
                        <a
                          href='#'
                          className='text-xs font-semibold text-primary hover:text-primary/80 transition-colors hover:underline underline-offset-4'
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Your password'
                            className='pr-12 h-11 transition-all focus-visible:ring-primary shadow-sm'
                            required
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          onClick={() => setShowPassword(prev => !prev)}
                          className='absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-transparent focus:outline-none'
                          tabIndex={-1}
                          disabled={loading}
                        >
                          {showPassword ? (
                            <EyeOffIcon size={18} />
                          ) : (
                            <EyeIcon size={18} />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full h-11 font-semibold text-base shadow-md transition-transform active:scale-[0.98]'
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : 'Login'}
                </Button>

                <div className='text-center text-sm pt-2'>
                  <Link href='/home'>
                    <Button
                      variant='ghost'
                      className='w-full text-muted-foreground hover:text-foreground transition-colors'
                      disabled={loading}
                    >
                      <ArrowLeftIcon className='mr-2 h-4 w-4' /> Back to
                      homepage
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          {/* Right Side Image for Desktop */}
          <div className='bg-muted relative hidden md:block border-l border-border'>
            <div className='absolute right-4 top-4 z-10'>
              <ThemeToggle loginPage={true} />
            </div>
            {/* ✅ Optional Overlay to make the image blend better with the theme */}
            <div className='absolute inset-0 bg-indigo-900/10 dark:bg-black/40 z-[5] pointer-events-none mix-blend-multiply' />
            <Image
              src='https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/assets/tree-8175062_1280-4EsCdIQovDFE4pBueAoX0WihX5Ppzl.jpg'
              alt='Login page background'
              fill
              priority
              sizes='(max-width: 768px) 100vw, 50vw'
              className='absolute inset-0 h-full w-full object-cover transition-all duration-700 dark:brightness-[0.3] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
