import type { IApiClientArticlesParams } from '@/shared/api'
import type { OverlayProps } from '@/shared/lib/overlay'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { DpQueryKeys } from '@/shared/api'
import { ARTICLE_TYPE_OPTIONS } from '@/shared/config'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { showToast } from '@/shared/lib/utils'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ModalOverlay,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui'

const formSchema = z.object({
  published_at: z.string().min(4, {
    message: 'Published at must be at least 2 characters.',
  }),
  reference_name: z.string().min(2, {
    message: 'Reference name must be at least 2 characters.',
  }),
  reference_url: z.string().min(2, {
    message: 'Reference URL must be at least 2 characters.',
  }),
  summary: z.string().min(2, {
    message: 'Summary must be at least 2 characters.',
  }),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  type: z.enum(['trendAndLifestyle', 'ai', 'frontend'], {
    message: 'Type is required.',
  }),
  unique_id: z.string().min(2, {
    message: 'Unique ID must be at least 2 characters.',
  }),
})

export const CreateArticleOverlay = ({ isOpen, close }: OverlayProps) => {
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      published_at: '',
      reference_name: '',
      reference_url: '',
      summary: '',
      title: '',
      type: 'ai',
      unique_id: '',
    },
    resolver: zodResolver(formSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (inputs: IApiClientArticlesParams<'create'>) => {
      return ApiClientCSR.articles.create(inputs)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        exact: false,
        queryKey: DpQueryKeys.admin.articles.list(),
      })
      showToast.success('Successfully created articles')
      close()
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values)
  }

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={close}
      className="flex flex-col gap-6 p-4"
    >
      <header>
        <h3 className="text-lg font-semibold">Create Article</h3>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea placeholder="Summary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ARTICLE_TYPE_OPTIONS.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference Name</FormLabel>
                <FormControl>
                  <Input placeholder="Reference name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unique_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unique ID</FormLabel>
                <FormControl>
                  <Input placeholder="Unique ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button variant={'ghost'} disabled={isPending} onClick={close}>
              {isPending ? 'Creating...' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </Form>
    </ModalOverlay>
  )
}
