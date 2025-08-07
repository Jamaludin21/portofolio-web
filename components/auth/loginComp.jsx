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

export function LoginForm ({ className, ...props }) {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: isClientReady ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      {...props}
    >
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid relative p-0 md:grid-cols-2'>
          <div className='absolute right-4 top-4 z-10 md:hidden'>
            <ThemeToggle loginPage={true} />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-bold'>Welcome back</h1>
                  <p className='text-muted-foreground text-balance'>
                    Login to your portfolio panel management account
                  </p>
                </div>
                {alertMessage && (
                  <Alert variant='destructive' className='mb-4'>
                    <AlertTitle>Login Failed</AlertTitle>
                    <AlertDescription>{alertMessage}</AlertDescription>
                  </Alert>
                )}
                <FormField
                  name='email'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='account@gmail.com'
                          required
                          disabled={loading}
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
                        <FormLabel>Password</FormLabel>
                        <a
                          href='#'
                          className='text-sm underline-offset-2 hover:underline'
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Your password'
                            className='pr-10'
                            required
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type='button'
                          variant='ghost'
                          onClick={() => setShowPassword(prev => !prev)}
                          className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none'
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

                <Button type='submit' className='w-full' disabled={loading}>
                  {loading ? 'Please wait...' : 'Login'}
                </Button>

                <div className='text-center text-sm'>
                  <Link href='/home'>
                    <Button
                      variant='link'
                      className='w-full'
                      disabled={loading}
                    >
                      <ArrowLeftIcon /> Back to homepage
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className='bg-muted relative hidden md:block'>
            <div className='absolute right-4 top-4 z-10'>
              <ThemeToggle loginPage={true} />
            </div>
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
