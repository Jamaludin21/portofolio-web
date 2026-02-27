'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRandomBackground } from '@/hooks/useTheme'
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { InfoIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function Portfolio ({ portofolio: dataPortfolio }) {
  const bgImage = useRandomBackground()

  return (
    <motion.section
      id='portfolio-section'
      className='relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed py-20 sm:py-24 lg:py-32'
      variants={staggerContainer}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dynamic Overlay */}
      <div className='absolute inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-[2px] z-0' />

      {/* Content */}
      <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.h2
          variants={fadeInLeft}
          className='text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-12 text-center md:text-left'
        >
          Professional Projects
        </motion.h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
          {dataPortfolio?.map((item, index) => (
            <motion.div
              key={item.id || index}
              variants={fadeInRight}
              className='flex flex-col items-center gap-5 group cursor-pointer'
            >
              {/* Image */}
              <div className='w-full aspect-video overflow-hidden rounded-2xl border border-border/50 shadow-sm'>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  sizes='(max-width: 768px) 100vw, 50vw'
                  width={600}
                  height={400}
                  className='object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110'
                  priority={index < 3} // Optimize: priority load hanya untuk 3 gambar pertama
                />
              </div>

              {/* Info */}
              <div className='flex items-center justify-between w-full'>
                <div className='flex-1 pr-4'>
                  <h4 className='text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-1'>
                    {item.title}
                  </h4>
                  <p className='text-sm font-medium text-muted-foreground'>
                    {item.category}
                  </p>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  {item.description && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type='button'
                          className='p-2 rounded-full hover:bg-accent transition-colors focus:outline-none'
                          aria-label='More info'
                        >
                          <InfoIcon
                            size={18}
                            className='text-muted-foreground hover:text-primary transition-colors'
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className='max-w-[80vw] sm:max-w-xs break-words whitespace-pre-wrap leading-relaxed'>
                        {item.description}
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {/* CTA Arrow */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type='button'
                        aria-label='Open project link'
                        variant='secondary'
                        size='icon'
                        className='rounded-full h-8 w-8 hover:bg-primary hover:text-primary-foreground transition-all duration-300'
                        onClick={() => window.open(item.projectUrl, '_blank')}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 17 16'
                          fill='none'
                          className='stroke-current'
                        >
                          <path
                            d='M9.62553 4L13.6664 8.0409M13.6664 8.0409L9.62553 12.0818M13.6664 8.0409L1.6665 8.0409'
                            strokeWidth='1.6'
                            strokeLinecap='round'
                          />
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-white text-black text-xs font-medium'>
                      Open project link
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
