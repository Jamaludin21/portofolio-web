import { useSortable } from '@dnd-kit/sortable'
import { Button } from '@/components/ui/button'
import { IconGripVertical } from '@tabler/icons-react'

export function DragHandle ({ id }) {
  const { attributes, listeners } = useSortable({ id })
  return (
    <Button
      {...attributes}
      {...listeners}
      variant='ghost'
      size='icon'
      className='text-muted-foreground size-7 hover:bg-transparent'
      tabIndex={-1}
      type='button'
    >
      <IconGripVertical className='size-3' />
      <span className='sr-only'>Drag to reorder</span>
    </Button>
  )
}
