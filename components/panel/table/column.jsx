'use client'

import React from 'react'
import Image from 'next/image'
import { DragHandle } from '@/components/panel/table/dragHandle'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { IconDotsVertical, IconExternalLink } from '@tabler/icons-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import dayjs from 'dayjs'

// Helper for date rendering
function renderDate (value) {
  if (!value) return <span className='text-muted-foreground'>-</span>
  return (
    <span className='whitespace-nowrap'>
      {dayjs(value).format('DD MMM YYYY')}
    </span>
  )
}

// Helper for image rendering
function renderImage (url, alt = 'Image') {
  if (!url)
    return (
      <span className='text-muted-foreground text-xs italic'>No image</span>
    )
  return (
    <Image
      src={url}
      alt={alt}
      width={48}
      height={48}
      className='object-cover rounded-md border'
      style={{ maxWidth: 48, maxHeight: 48 }}
    />
  )
}

// Helper for boolean
function renderBoolean (val) {
  return (
    <Badge
      variant={val ? 'success' : 'destructive'}
      className='capitalize px-2'
    >
      {val ? 'Yes' : 'No'}
    </Badge>
  )
}

export function createColumns ({
  columnsConfig = [],
  onEdit,
  onDelete,
  data,
  customComponents = {}
}) {
  return columnsConfig.map(col => {
    // --- Special columns ---
    if (col.type === 'drag') {
      return {
        id: 'drag',
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
        ...col.extraProps
      }
    }

    if (col.type === 'select') {
      return {
        id: 'select',
        header: ({ table }) => (
          <div className='flex items-center justify-center'>
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={value =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label='Select all'
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className='flex items-center justify-center'>
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={value => row.toggleSelected(!!value)}
              aria-label='Select row'
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        ...col.extraProps
      }
    }

    if (col.type === 'actions') {
      return {
        id: 'actions',
        header: col.header || null,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='size-8' size='icon'>
                <IconDotsVertical />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-32'>
              <DropdownMenuItem onClick={() => onEdit && onEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>Make a copy</DropdownMenuItem>
              <DropdownMenuItem>Favorite</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant='destructive'
                onClick={() => onDelete && onDelete(row.original)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        ...col.extraProps
      }
    }

    // --- Custom render handler (for full override) ---
    if (col.render) {
      return {
        ...col,
        cell: ({ row, cell }) =>
          col.render(row.original, cell, {
            data,
            onEdit,
            onDelete,
            ...customComponents
          })
      }
    }

    // --- Prisma/Postgres common types ---
    // DateTime
    if (col.type === 'date' || col.type === 'datetime') {
      return {
        ...col,
        cell: ({ row }) =>
          renderDate(row.original[col.dataIndex || col.accessorKey])
      }
    }

    // Boolean
    if (col.type === 'boolean') {
      return {
        ...col,
        cell: ({ row }) =>
          renderBoolean(row.original[col.dataIndex || col.accessorKey])
      }
    }

    // Image/Avatar (e.g. Hero, Experience, Education, Portfolio)
    if (col.type === 'image' || col.type === 'avatar') {
      return {
        ...col,
        cell: ({ row }) =>
          renderImage(
            row.original[col.dataIndex || col.accessorKey],
            col.title || col.header
          )
      }
    }

    // URL (open in new tab)
    if (col.type === 'url') {
      return {
        ...col,
        cell: ({ row }) => {
          const url = row.original[col.dataIndex || col.accessorKey]
          return url ? (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary underline flex items-center gap-1'
            >
              {url}
              <IconExternalLink className='inline w-4 h-4' />
            </a>
          ) : (
            <span className='text-muted-foreground'>-</span>
          )
        }
      }
    }

    // Enum/Badge fields (level, category, role, device)
    if (
      col.type === 'badge' ||
      ['level', 'category', 'role', 'device'].includes(
        col.dataIndex || col.accessorKey
      )
    ) {
      return {
        ...col,
        cell: ({ row }) => (
          <Badge variant='outline' className='capitalize'>
            {row.original[col.dataIndex || col.accessorKey]}
          </Badge>
        )
      }
    }

    // Multi-line description/rich text preview
    if (
      col.type === 'description' ||
      ['summary', 'content', 'description'].includes(
        col.dataIndex || col.accessorKey
      )
    ) {
      return {
        ...col,
        cell: ({ row }) => (
          <div className='max-w-xs line-clamp-2 text-xs text-muted-foreground'>
            {row.original[col.dataIndex || col.accessorKey]}
          </div>
        )
      }
    }

    // Default string/text field
    return {
      ...col,
      id: col.id || col.dataIndex || col.accessorKey || makeUniqueId(),
      accessorKey: col.dataIndex || col.accessorKey,
      header: col.title || col.header,
      cell: col.cell
        ? col.cell
        : ({ row }) => row.original[col.dataIndex || col.accessorKey],
      ...col.extraProps
    }
  })
}
