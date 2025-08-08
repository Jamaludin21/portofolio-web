'use client'

import { GlobalDataTable } from '@/components/panel/table'
import {
  educationColumnsConfig,
  experienceColumnsConfig,
  skillColumnsConfig
} from '@/lib/columns'
import { createColumns } from '@/components/panel/table/column'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function BioContent ({ session, propsValue }) {
  useDocumentTitle('My Bio')
  const { experience, skills, education } = propsValue

  // Optionally define onEdit/onDelete handlers here (modal, navigation, etc)
  const handleEdit = row => {
    /* ... */
  }
  const handleDelete = row => {
    /* ... */
  }

  // Use your dynamic column factory
  const experienceColumns = createColumns({
    columnsConfig: experienceColumnsConfig,
    onEdit: handleEdit,
    onDelete: handleDelete,
    data: experience
  })
  const skillColumns = createColumns({
    columnsConfig: skillColumnsConfig,
    onEdit: handleEdit,
    onDelete: handleDelete,
    data: skills
  })
  const educationColumns = createColumns({
    columnsConfig: educationColumnsConfig,
    onEdit: handleEdit,
    onDelete: handleDelete,
    data: education
  })

  return (
    <section className='flex flex-1 flex-col p-4'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        {/* Experience Table (full width on all screens) */}
        <div className='mb-10'>
          <h2 className='text-xl font-bold p-2'>Work Experience</h2>
          <div className='rounded-xl bg-white shadow border overflow-x-auto'>
            <div className='overflow-y-auto max-h-[400px]'>
              <GlobalDataTable columns={experienceColumns} data={experience} />
            </div>
          </div>
        </div>
        {/* Skills & Education side by side on desktop, stacked on mobile */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white shadow rounded-xl border overflow-x-auto'>
            <h2 className='text-xl font-bold p-4'>Skills</h2>
            <div className='overflow-y-auto max-h-[400px]'>
              <GlobalDataTable columns={skillColumns} data={skills} />
            </div>
          </div>
          <div className='bg-white shadow rounded-xl border overflow-x-auto'>
            <h2 className='text-xl font-bold p-4'>Education</h2>
            <div className='overflow-y-auto max-h-[400px]'>
              <GlobalDataTable columns={educationColumns} data={education} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
