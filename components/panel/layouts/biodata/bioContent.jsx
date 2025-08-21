'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { GlobalDataTable } from '@/components/panel/table'
import {
  educationColumnsConfig,
  experienceColumnsConfig,
  skillColumnsConfig
} from '@/lib/columns'
import { createColumns } from '@/components/panel/table/column'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { deleteData, deleteBlob } from '@/lib/apiClient' // <-- add deleteBlob
import { GlobalDialog } from '@/components/panel/dialog/globalDialog'
import { collectBlobUrls } from '@/lib/helper'

export function BioContent ({ session, propsValue }) {
  useDocumentTitle('My Bio')
  const router = useRouter()
  const { experience, skills, education } = propsValue
  const [editOpen, setEditOpen] = React.useState(false)
  const [editResource, setEditResource] = React.useState(null) // 'experience'|'skill'|'education'
  const [editRow, setEditRow] = React.useState(null) // row or null (for "Add")

  function makeHandlers (resource) {
    return {
      onEdit: row => {
        setEditResource(resource)
        setEditRow(row) // pass row for edit
        setEditOpen(true)
      },
      onDelete: async row => {
        if (!confirm(`Delete this ${resource}?`)) return
        try {
          // 1) delete blob(s) FIRST (if any)
          const urls = collectBlobUrls(resource, row)
          for (const url of urls) {
            try {
              await deleteBlob(url)
            } catch (e) {
              // non-blocking: log and continue
              console.warn('Blob delete failed:', url, e)
            }
          }
          // 2) delete DB record
          await deleteData(resource, row.id)
          router.refresh()
        } catch (err) {
          console.error(err)
          alert('Failed to delete. See console.')
        }
      }
    }
  }

  const experienceColumns = createColumns({
    columnsConfig: experienceColumnsConfig,
    ...makeHandlers('experience'),
    data: experience
  })
  const skillColumns = createColumns({
    columnsConfig: skillColumnsConfig,
    ...makeHandlers('skill'),
    data: skills
  })
  const educationColumns = createColumns({
    columnsConfig: educationColumnsConfig,
    ...makeHandlers('education'),
    data: education
  })

  return (
    <section className='flex flex-1 flex-col p-4'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        {/* Experience */}
        <div className='mb-10'>
          <div className='bg-white dark:bg-gray-900 shadow rounded-xl border overflow-x-auto'>
            <div className='flex items-center justify-between p-4'>
              <h2 className='text-xl font-bold'>Work Experience</h2>
              {/* Optional: "Add new" that reuses the same dialog in create mode */}
              <button
                className='text-sm px-3 py-1.5 rounded-md border hover:bg-muted'
                onClick={() => {
                  setEditResource('experience')
                  setEditRow(null) // null → create
                  setEditOpen(true)
                }}
              >
                Add
              </button>
            </div>
            <div className='rounded-xl bg-white dark:bg-gray-900 shadow border overflow-x-auto'>
              <div className='overflow-y-auto max-h-[400px]'>
                <GlobalDataTable
                  columns={experienceColumns}
                  data={experience}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Education */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white dark:bg-gray-900 shadow rounded-xl border overflow-x-auto'>
            <div className='flex items-center justify-between p-4'>
              <h2 className='text-xl font-bold'>Skills</h2>
              <button
                className='text-sm px-3 py-1.5 rounded-md border hover:bg-muted'
                onClick={() => {
                  setEditResource('skill')
                  setEditRow(null)
                  setEditOpen(true)
                }}
              >
                Add
              </button>
            </div>
            <div className='overflow-y-auto max-h-[400px]'>
              <GlobalDataTable columns={skillColumns} data={skills} />
            </div>
          </div>

          <div className='bg-white dark:bg-gray-900 shadow rounded-xl border overflow-x-auto'>
            <div className='flex items-center justify-between p-4'>
              <h2 className='text-xl font-bold'>Education</h2>
              <button
                className='text-sm px-3 py-1.5 rounded-md border hover:bg-muted'
                onClick={() => {
                  setEditResource('education')
                  setEditRow(null)
                  setEditOpen(true)
                }}
              >
                Add
              </button>
            </div>
            <div className='overflow-y-auto max-h-[400px]'>
              <GlobalDataTable columns={educationColumns} data={education} />
            </div>
          </div>
        </div>
      </div>

      {/* One dialog, works for Add (row=null) and Edit (row provided) */}
      <GlobalDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        resource={editResource}
        row={editRow}
      />
    </section>
  )
}
