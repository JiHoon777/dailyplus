import type { OverlayProps } from '@/shared/lib/overlay'
import type { IQuoteCreateRequest } from '@/shared/types'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ApiClient, DpQueryKeys } from '@/shared/api'
import { showToast } from '@/shared/lib/utils'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui'

const formSchema = z.object({
  koreanText: z.string().min(2, {
    message: 'Korean text must be at least 2 characters.',
  }),
  originalText: z.string().min(2, {
    message: 'Original text must be at least 2 characters.',
  }),
  quotePersonId: z.number().min(1, {
    message: 'Quote person id must be at least 1.',
  }),
})

// Todo: Refactor Form Logic, Components
export const CreateQuotesOverlay = ({ isOpen, close }: OverlayProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      koreanText: '',
      originalText: '',
      quotePersonId: undefined,
    },
    resolver: zodResolver(formSchema),
  })

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (input: IQuoteCreateRequest) => {
      ApiClient.quotes.create(input)
    },
    onSuccess: () => {
      showToast.success('Quote created successfully!')
      queryClient.invalidateQueries({
        exact: false,
        queryKey: DpQueryKeys.admin.quotes.list(),
      })
      close()
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values)
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-6 p-4">
        <DialogTitle>Create Quotes</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="originalText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="original" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="koreanText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Korean Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="korean" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Todo: List Api, 현재는 공자 위주로 할 거기때문에 스킵 */}
            <FormField
              control={form.control}
              name="quotePersonId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote Person Id</FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a quote person" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={'2'}>공자</SelectItem>
                    </SelectContent>
                  </Select>
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
