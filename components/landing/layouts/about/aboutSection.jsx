'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SmartContentRenderer } from '@/hooks/useSmartRender'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import { Skeleton } from '@/components/ui/skeleton'
import { GithubIcon, LinkedinIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRandomBackground } from '@/hooks/useTheme'

export function AboutSection ({
  id,
  title,
  imageUrl,
  imagePosition = 'left',
  items = [],
  itemsSkill = [],
  itemsEducation = [],
  type = 'experience',
  isLoading = false,
  ScrollTo = false,
  ScrollBack = false
}) {
  const bgImage = useRandomBackground()
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='space-y-6'>
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className='h-20 w-full rounded-md' />
          ))}
        </div>
      )
    }

    switch (type) {
      case 'hero':
        return (
          <div className='space-y-6'>
            <h2 className='text-4xl lg:text-5xl font-bold text-gray-600 dark:text-gray-200'>
              {items.name}
            </h2>
            <p className='text-xl text-indigo-600 font-semibold'>
              {items.role}
            </p>
            <div className='flex items-center gap-4'>
              <a
                href='https://github.com/Jamaludin21'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button
                  size='small'
                  variant='outline'
                  className='p-2 cursor-pointer'
                >
                  <GithubIcon
                    size={28}
                    className='text-gray-600 hover:text-blue-600'
                  />
                  <p>Github</p>
                </Button>
              </a>

              <a
                href='https://www.linkedin.com/in/jamaludin-hakim-harsoyo-5a86a2240'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button
                  size='small'
                  variant='outline'
                  className='p-2 cursor-pointer'
                >
                  <LinkedinIcon
                    size={28}
                    className='text-gray-600 hover:text-blue-600'
                  />
                  <p>LinkedIn</p>
                </Button>
              </a>
            </div>
            <p className='text-lg text-gray-600 dark:text-gray-200 leading-8'>
              {items.summary}
            </p>
            <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-500'>
              Technical Skill
            </h2>
            <ul className='grid grid-cols-2 gap-x-6 gap-y-4 text-lg text-gray-700 dark:text-gray-300 list-disc list-inside'>
              {itemsSkill.map((skill, idx) => (
                <li key={idx}>{skill.name}</li>
              ))}
            </ul>
          </div>
        )
      case 'experience':
        return (
          <div className='space-y-12'>
            <h2 className='text-2xl lg:text-3xl font-bold text-gray-600 dark:text-gray-200 underline'>
              Work Experience
            </h2>
            {items.map(item => (
              <div key={item.id} className='flex justify-between'>
                <div
                  className={cn(
                    item.imageUrl ? 'md:col-span-3' : 'md:col-span-4'
                  )}
                >
                  <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-400'>
                    {item.title}
                  </h3>
                  <p className='text-sm text-gray-500 mb-2'>
                    {item.company} · {dayjs(item.startDate).format('MMM YYYY')}{' '}
                    –{' '}
                    {item.endDate
                      ? dayjs(item.endDate).format('MMM YYYY')
                      : 'Present'}
                  </p>
                  <SmartContentRenderer
                    content={item.content}
                    className='text-gray-600 dark:text-gray-200 text-sm leading-7'
                  />
                </div>
                {item.imageUrl && (
                  <div className='md:col-span-1'>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={160}
                      height={160}
                      className='rounded-md object-cover'
                    />
                  </div>
                )}
              </div>
            ))}
            <h2 className='text-2xl lg:text-3xl font-bold text-gray-600 dark:text-gray-200 underline'>
              Education
            </h2>
            {itemsEducation.map(edu => (
              <div key={edu.id} className='flex justify-between'>
                <div
                  className={cn(
                    edu.imageUrl ? 'md:col-span-3' : 'md:col-span-4'
                  )}
                >
                  <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-400'>
                    {edu.school}
                  </h3>
                  <p className='text-sm text-gray-500 mb-2'>
                    {edu.degree} · {edu.major}
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-200'>
                    {edu.description}
                  </p>
                </div>
                {edu.imageUrl && (
                  <div className='md:col-span-1'>
                    <Image
                      src={edu.imageUrl}
                      alt={edu.school}
                      width={160}
                      height={160}
                      className='rounded-md object-cover'
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  const image = imageUrl && (
    <motion.div
      className='w-full max-lg:mb-8'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className='relative w-full min-h-screen'>
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className='rounded-lg object-contain mx-auto'
        />
      </div>
    </motion.div>
  )

  return (
    <section
      id={id}
      className={`min-h-screen bg-cover ${
        type === 'hero' ? 'pt-8 pb-15' : 'py-20'
      } relative bg-center bg-no-repeat bg-fixed`}
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div
          className={cn(
            type === 'hero'
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:h-[80vh] h-auto'
              : 'flex flex-col gap-12'
          )}
        >
          {imagePosition === 'left' && image}
          <motion.div
            className='flex flex-col justify-center px-4'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {renderContent()}
          </motion.div>
          {imagePosition === 'right' && image}
          {ScrollTo}
          {ScrollBack}
        </div>
      </div>
    </section>
  )
}
