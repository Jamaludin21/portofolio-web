'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { createData, updateData, uploadFile, deleteBlob } from '@/lib/apiClient'
import { buildDefaultValues, getRules } from '@/lib/helper'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { FIELD_CONFIG } from '@/lib/resourceFields'

function gridSpanClass (span) {
  return span === 'full' ? 'col-span-1 md:col-span-2' : 'col-span-1'
}

export function GlobalDialog ({ open, onOpenChange, resource, row }) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const fields = FIELD_CONFIG[resource] || []
  const isEdit = !!row?.id

  const form = useForm({
    defaultValues: buildDefaultValues(resource, row, FIELD_CONFIG),
    mode: 'onBlur'
  })

  React.useEffect(() => {
    form.reset(buildDefaultValues(resource, row, FIELD_CONFIG))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, row])

  /** Files selected in the UI but not yet uploaded. shape: { [fieldKey]: File } */
  const [pendingFiles, setPendingFiles] = React.useState({})
  /** Local blob previews for instant UX. shape: { [fieldKey]: blobUrl } */
  const [previews, setPreviews] = React.useState({})
  /** Tracks which existing blob URLs should be deleted AFTER a successful update/create */
  const [toDeleteBlobs, setToDeleteBlobs] = React.useState([])

  // cleanup object URLs on unmount
  React.useEffect(() => {
    return () =>
      Object.values(previews).forEach(url => URL.revokeObjectURL(url))
  }, [previews])

  function setPendingFile (fieldKey, file) {
    setPendingFiles(prev => ({ ...prev, [fieldKey]: file }))
  }

  function setPreview (fieldKey, file) {
    setPreviews(prev => {
      if (prev[fieldKey]) URL.revokeObjectURL(prev[fieldKey])
      return file
        ? { ...prev, [fieldKey]: URL.createObjectURL(file) }
        : (() => {
            const next = { ...prev }
            delete next[fieldKey]
            return next
          })()
    })
  }

  function previewSrc (fieldKey) {
    return previews[fieldKey] || form.getValues(fieldKey) || ''
  }

  function clearImage (fieldKey) {
    // mark existing URL for deletion only if we are editing and there is a persisted URL
    const existingUrl = form.getValues(fieldKey)
    if (isEdit && existingUrl) {
      setToDeleteBlobs(prev => [...prev, existingUrl])
    }
    // clear local states
    setPendingFile(fieldKey, null)
    setPreview(fieldKey, null)
    // clear form value
    form.setValue(fieldKey, '', { shouldDirty: true, shouldTouch: true })
  }

  /** Upload any pending files first, then create/update DB. If an image was replaced, delete the old blob(s). */
  async function onSubmit (values) {
    if (!resource) return
    setLoading(true)
    try {
      // 1) Upload new/changed files (if any). Replace form values with new URLs.
      for (const f of fields) {
        if (f.type !== 'image') continue
        const file = pendingFiles[f.key]
        if (file) {
          const { url } = await uploadFile(file, { folder: resource })
          values[f.key] = url
        }
      }

      // 2) Perform DB operation
      if (isEdit) {
        await updateData(resource, row.id, values)
      } else {
        await createData(resource, values)
      }

      // 3) Now that DB is committed, delete any orphaned blobs (old images you replaced/cleared)
      for (const url of toDeleteBlobs) {
        try {
          await deleteBlob(url)
        } catch (e) {
          // non-blocking; log only
          console.warn('Failed to delete old blob:', url, e)
        }
      }

      onOpenChange(false)
      router.refresh()
    } catch (err) {
      console.error(err)
      alert('Failed to save. See console.')
    } finally {
      setLoading(false)
      setToDeleteBlobs([]) // reset queue
    }
  }

  return (
    <Dialog open={open} onOpenChange={v => !loading && onOpenChange(v)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit' : 'Add'}{' '}
            {resource
              ? resource.charAt(0).toUpperCase() + resource.slice(1)
              : ''}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update fields and save.' : 'Fill the fields and create.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {fields.map(f => (
                <div key={f.key} className={gridSpanClass(f.span)}>
                  <FormField
                    control={form.control}
                    name={f.key}
                    rules={getRules(f)}
                    render={({ field }) => (
                      <FormItem>
                        {/* Boolean → compact row */}
                        {f.type !== 'boolean' ? (
                          <FormLabel>
                            {f.label}
                            {f.required ? ' *' : ''}
                          </FormLabel>
                        ) : (
                          <div className='flex items-center justify-between'>
                            <FormLabel className='mr-2'>{f.label}</FormLabel>
                            <FormControl>
                              <Switch
                                checked={!!field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </div>
                        )}

                        {/* Text */}
                        {f.type === 'text' && (
                          <FormControl>
                            <Input placeholder={f.label} {...field} />
                          </FormControl>
                        )}

                        {/* Textarea */}
                        {f.type === 'textarea' && (
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder={f.label}
                              {...field}
                            />
                          </FormControl>
                        )}

                        {/* Date */}
                        {f.type === 'date' && (
                          <FormControl>
                            <Input
                              type='date'
                              {...field}
                              value={field.value ?? ''}
                            />
                          </FormControl>
                        )}

                        {/* Image file + preview (upload deferred to submit) */}
                        {f.type === 'image' && (
                          <div className='flex gap-3'>
                            <div className='flex items-center gap-2'>
                              <Input
                                type='file'
                                accept='image/*'
                                onChange={e => {
                                  const file = e.target.files?.[0]
                                  if (!file) return
                                  // If there is an existing URL (editing) we mark it for deletion *after* successful save.
                                  const existingUrl = form.getValues(f.key)
                                  if (existingUrl) {
                                    setToDeleteBlobs(prev =>
                                      Array.from(
                                        new Set([...prev, existingUrl])
                                      )
                                    )
                                  }
                                  setPendingFile(f.key, file)
                                  setPreview(f.key, file)
                                  // keep the form value as-is for now; it will be replaced by the uploaded URL on submit
                                }}
                              />

                              {previewSrc(f.key) && (
                                <Button
                                  type='button'
                                  variant='secondary'
                                  onClick={() => clearImage(f.key)}
                                  disabled={loading}
                                >
                                  Clear
                                </Button>
                              )}
                            </div>

                            {previewSrc(f.key) ? (
                              <div className='relative w-20 h-20 aspect-video overflow-hidden rounded-md border bg-muted'>
                                <Image
                                  src={previewSrc(f.key)}
                                  alt='Preview'
                                  fill
                                  sizes='(max-width: 768px) 100vw, 400px'
                                  unoptimized
                                />
                              </div>
                            ) : (
                              <p className='text-xs text-muted-foreground'>
                                No image selected.
                              </p>
                            )}
                          </div>
                        )}

                        {/* spacer for boolean so FormMessage has a place */}
                        {f.type === 'boolean' && <div />}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={loading}>
                {loading
                  ? isEdit
                    ? 'Saving…'
                    : 'Creating…'
                  : isEdit
                  ? 'Save'
                  : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
