'use client'

import * as React from 'react'
import { ChartAreaInteractive } from '@/components/panel/layouts/dashboard/chart-area-interactive'
import { SectionCards } from '@/components/panel/layouts/dashboard/section-cards'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function DashboardContent ({ session, counts, chartData }) {
  useDocumentTitle('Main Dashboard')
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards counts={counts} />
          <div className='px-4 lg:px-6'>
            <ChartAreaInteractive chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  )
}
