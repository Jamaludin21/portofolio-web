'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRandomBackground } from '@/hooks/useTheme'
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/constants'
import { useRef, useState } from 'react'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { FaEnvelope, FaLocationArrow, FaWhatsapp } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { formatPhoneNumber } from '@/lib/helper'

export function ContactMe ({ userData }) {
  useDocumentTitle('Contact Me')

  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)
  const isInView = useInView(formRef, { once: true, margin: '-100px' })
  const bgImage = useRandomBackground()
  const { phoneNumber, email } = userData

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      method: 'email',
      message: ''
    }
  })

  async function onSubmit (values) {
    const formattedPhone = formatPhoneNumber(phoneNumber)
    setLoading(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${values.name} in portfolio website`,
          ...values
        })
      })

      const result = await response.json()
      if (result.success) {
        toast.success('Message sent successfully!')
        form.reset()

        if (values.method === 'phone') {
          // Optionally redirect to WhatsApp chat with pre-filled message
          const whatsappMessage = `Hello, my name is ${values.name}. ${values.message}`
          window.open(
            `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
              whatsappMessage
            )}`,
            '_blank'
          )
        }
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to send message.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      className='relative min-h-screen grid place-items-center w-full overflow-hidden bg-cover bg-center bg-no-repeat pt-16 px-4 sm:px-6 lg:px-8'
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/40 dark:bg-black/60 z-0' />

      <div className='relative mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-0 flex flex-col sm:grid sm:grid-cols-2 gap-12 sm:gap-0 z-10'>
        {/* Left - Contact Details with Image */}
        <motion.div
          variants={fadeInLeft}
          initial='hidden'
          animate='visible'
          className='w-full h-full min-h-[500px] flex flex-col justify-between'
        >
          <div className='relative w-full min-h-[85vh] sm:min-h-full h-full rounded-2xl overflow-hidden flex-1'>
            <Image
              src='https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/hero/supawork-photo-20250730T045550996Z-QsPvjejsOE6dadyRmikqGO2qhzUBMs.png'
              alt='Contact illustration AI'
              className='object-cover'
              fill
              priority
            />
            <div className='absolute inset-0 bg-indigo-700/50 z-10'></div>
            <h2 className='absolute top-6 left-6 sm:top-10 sm:left-10 text-white text-3xl sm:text-4xl font-bold z-20'>
              Contact Me
            </h2>
            <div className='absolute bottom-0 w-full p-4 z-20'>
              <div className='bg-white dark:bg-gray-800 rounded-lg p-2 md:p-4 space-y-2'>
                <div className='flex items-center flex-wrap gap-3 sm:gap-4'>
                  <FaWhatsapp className='text-green-600 text-xs' />
                  <p className='text-gray-700 dark:text-gray-200 text-sm sm:text-base'>
                    {phoneNumber}
                  </p>
                </div>
                <div className='flex items-center flex-wrap gap-3 sm:gap-4'>
                  <FaEnvelope className='text-amber-300 text-xs' />
                  <p className='text-gray-700 dark:text-gray-200 text-sm sm:text-base'>
                    {email}
                  </p>
                </div>
                <div className='flex items-center flex-wrap gap-3 sm:gap-4'>
                  <FaLocationArrow className='text-red-600 text-xs' />
                  <p className='text-gray-700 dark:text-gray-200 text-sm sm:text-base'>
                    Bekasi Utara, Kota Bekasi, 17121
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          ref={formRef}
          variants={fadeInRight}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='w-full h-full min-h-[85vh] sm:min-h-full bg-white dark:bg-gray-800 p-6 sm:p-8 lg:p-11 rounded-2xl shadow-md flex flex-col justify-between'
        >
          <h2 className='text-indigo-600 text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8'>
            Send Me A Message
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-5 sm:space-y-6'
            >
              <FormField
                control={form.control}
                name='name'
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Name'
                        {...field}
                        className='rounded-full h-12'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Email'
                        {...field}
                        className='rounded-full h-12'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                rules={{ required: 'Phone number is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Phone'
                        {...field}
                        className='rounded-full h-12'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='method'
                rules={{ required: 'Method is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred method of communication</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-col sm:flex-row gap-3 sm:gap-6'
                      >
                        <label className='flex items-center gap-2'>
                          <RadioGroupItem value='email' id='email' /> Email
                        </label>
                        <label className='flex items-center gap-2'>
                          <RadioGroupItem value='phone' id='phone' /> Phone
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                rules={{ required: 'Message is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder='Message'
                        {...field}
                        className='h-32 resize-none rounded-lg'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                variant='outline'
                disabled={loading || !form.formState.isValid}
                className='w-full h-12 rounded-full bg-white hover:bg-indigo-700 text-indigo-700 dark:text-indigo-400 hover:text-white dark:hover:text-white font-semibold transition-colors duration-300 cursor-pointer'
              >
                {loading ? 'Sending...' : 'Submit'}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </motion.section>
  )
}
