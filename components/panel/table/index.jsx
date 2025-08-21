'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table'
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

export function GlobalDataTable ({ data, columns, rowKey = 'id' }) {
  const table = useReactTable({
    data,
    columns,
    getRowId: row => (row[rowKey] ?? '').toString(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows
  const colCount = table.getAllLeafColumns().length

  return (
    <div className='w-full flex-col gap-6'>
      <div className='relative flex flex-col gap-4 overflow-auto'>
        <div className='overflow-hidden rounded-lg border  border-gray-200 dark:border-gray-700  bg-white dark:bg-gray-900  shadow-sm'>
          <Table className='w-full text-sm sm:text-base'>
            <TableHeader className='sticky top-0 z-10  bg-gray-100 dark:bg-gray-800  text-gray-900 dark:text-gray-100  text-center'>
              {headerGroups.map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className='px-4 py-2 font-semibold'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {rows.length ? (
                rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='hover:bg-gray-50 dark:hover:bg-gray-800/60'
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className='px-4 py-2 text-gray-700 dark:text-gray-300'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={colCount}
                    className='h-24 text-center  text-gray-500 dark:text-gray-400'
                  >
                    No results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
