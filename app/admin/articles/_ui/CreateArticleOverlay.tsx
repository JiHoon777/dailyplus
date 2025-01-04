import type { IApiClientArticlesParams } from '@/shared/api'
import type { OverlayProps } from '@/shared/lib/overlay'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ApiClient, DpQueryKeys } from '@/shared/api'
import { ARTICLE_TYPE_OPTIONS } from '@/shared/config'
import { showToast } from '@/shared/lib/utils'
import { ArticleType } from '@/shared/types'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui'

const formSchema = z.object({
  publishedAt: z.date(),
  referenceName: z.string().min(2, {
    message: 'Reference name must be at least 2 characters.',
  }),
  referenceUrl: z.string().min(2, {
    message: 'Reference URL must be at least 2 characters.',
  }),
  summary: z.string().min(2, {
    message: 'Summary must be at least 2 characters.',
  }),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  type: z.enum(
    [ArticleType.AI, ArticleType.FRONTEND, ArticleType.TREND_AND_LIFESTYLE],
    {
      message: 'Type is required.',
    },
  ),
})

export const CreateArticleOverlay = ({ isOpen, close }: OverlayProps) => {
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      publishedAt: new Date(),
      referenceName: '',
      referenceUrl: '',
      summary: '',
      title: '',
      type: ArticleType.TREND_AND_LIFESTYLE,
    },
    resolver: zodResolver(formSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (inputs: IApiClientArticlesParams<'create'>) => {
      return ApiClient.articles.create(inputs)
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
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-6 p-4">
        <DialogTitle>Create Article</DialogTitle>
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
              name="referenceName"
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
              name="referenceUrl"
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
              name="publishedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value.toISOString()}
                    />
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
      </DialogContent>
    </Dialog>
  )
}
