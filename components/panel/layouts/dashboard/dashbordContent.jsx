'use client'

import * as React from 'react'
import { ChartAreaInteractive } from '@/components/panel/layouts/dashboard/chart-area-interactive'
import { DataTable } from '@/components/panel/layouts/dashboard/data-table'
import { SectionCards } from '@/components/panel/layouts/dashboard/section-cards'
import { dataDashboard } from '@/lib/helper'

export function DashboardContent () {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards />
          <div className='px-4 lg:px-6'>
            <ChartAreaInteractive />
          </div>
          <DataTable data={dataDashboard} />
        </div>
      </div>
    </div>
  )
}
