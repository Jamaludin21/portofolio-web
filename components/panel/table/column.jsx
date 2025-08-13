'use client'

import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { DragHandle } from '@/components/panel/table/dragHandle'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { IconDotsVertical, IconExternalLink } from '@tabler/icons-react'
import { ArchiveIcon, CheckIcon } from 'lucide-react'

/** ---------- cell render helpers ---------- */
function renderDate (value) {
  if (!value) return <span className='text-muted-foreground'>-</span>
  return (
    <span className='whitespace-nowrap'>
      {dayjs(value).format('DD MMM YYYY')}
    </span>
  )
}

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

function renderBoolean (val) {
  return (
    <Badge
      variant={val ? 'success' : 'destructive'}
      className='capitalize px-2'
    >
      {val ? <CheckIcon /> : <ArchiveIcon />}
    </Badge>
  )
}

/** ---------- small util to ensure id/header/accessorKey exist ---------- */
function base (col) {
  const accessorKey = col.dataIndex ?? col.accessorKey
  const id =
    col.id ?? accessorKey ?? `col_${Math.random().toString(36).slice(2, 8)}`
  return {
    id,
    accessorKey,
    header: <div className='text-center'>{col.title ?? col.header}</div>, // <-- IMPORTANT: TanStack uses `header`
    ...col.extraProps
  }
}

/**
 * Build TanStack columns from your config safely (JS)
 * Ensures every column has header/id/accessorKey when needed
 */
export function createColumns ({
  columnsConfig = [],
  onEdit,
  onDelete,
  data,
  customComponents = {}
}) {
  return columnsConfig.map(col => {
    /** ---- special columns (no accessor) ---- */
    if (col.type === 'drag') {
      return {
        id: col.id ?? 'drag',
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
        enableSorting: false,
        enableHiding: false,
        ...col.extraProps
      }
    }

    if (col.type === 'select') {
      return {
        id: col.id ?? 'select',
        header: ({ table }) => (
          <div className='flex items-center justify-center'>
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={v => table.toggleAllPageRowsSelected(!!v)}
              aria-label='Select all'
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className='flex items-center justify-center'>
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={v => row.toggleSelected(!!v)}
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
        id: col.id ?? 'actions',
        header: col.title ?? col.header ?? null,
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

    /** ---- full custom renderer override ---- */
    if (col.render) {
      const b = base(col)
      return {
        ...b,
        cell: ({ row, cell }) =>
          col.render(row.original, cell, {
            data,
            onEdit,
            onDelete,
            ...customComponents
          })
      }
    }

    /** ---- typed/default renderers (these NEED header + accessorKey) ---- */
    if (col.type === 'date' || col.type === 'datetime') {
      const b = base(col)
      return {
        ...b,
        cell: ({ row }) => renderDate(row.original[b.accessorKey])
      }
    }

    if (col.type === 'boolean') {
      const b = base(col)
      return {
        ...b,
        cell: ({ row }) => (
          <div className='text-center'>
            {renderBoolean(row.original[b.accessorKey])}
          </div>
        )
      }
    }

    if (col.type === 'image' || col.type === 'avatar') {
      const b = base(col)
      return {
        ...b,
        cell: ({ row }) =>
          renderImage(row.original[b.accessorKey], col.title ?? col.header)
      }
    }

    if (col.type === 'url') {
      const b = base(col)
      return {
        ...b,
        cell: ({ row }) => {
          const url = row.original[b.accessorKey]
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

    // enums/badges (explicit type or common field names)
    if (
      col.type === 'badge' ||
      ['level', 'category', 'role', 'device'].includes(
        col.dataIndex ?? col.accessorKey
      )
    ) {
      const b = base(col)
      return {
        ...b,
        cell: ({ row }) => (
          <Badge variant='outline' className='capitalize'>
            {row.original[b.accessorKey]}
          </Badge>
        )
      }
    }

    // description-ish previews
    if (
      col.type === 'description' ||
      ['summary', 'content', 'description'].includes(
        col.dataIndex ?? col.accessorKey
      )
    ) {
      const b = base(col)
      return {
        ...b,
        cell: ({ row }) => {
          const text = row.original[b.accessorKey]
          if (!text) return <span className='text-muted-foreground'>-</span>

          // default widths; override per-column via config if you want
          const truncatedClass =
            col.ellipsisClassName ??
            'max-w-xs line-clamp-2 truncate overflow-hidden text-xs text-muted-foreground cursor-pointer'
          const tooltipClass =
            col.tooltipClassName ??
            'max-w-[60ch] whitespace-pre-wrap break-words'

          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  tabIndex={0}
                  role='button'
                  className={truncatedClass}
                  onClick={e => e.currentTarget.focus()}
                  onTouchEnd={e => {
                    // prevent ghost click then focus
                    e.preventDefault()
                    e.currentTarget.focus()
                  }}
                >
                  {text}
                </div>
              </TooltipTrigger>
              <TooltipContent className={tooltipClass}>{text}</TooltipContent>
            </Tooltip>
          )
        }
      }
    }

    /** ---- default text column ---- */
    const b = base(col)
    return {
      ...b,
      cell: col.cell ? col.cell : ({ row }) => row.original[b.accessorKey]
    }
  })
}
