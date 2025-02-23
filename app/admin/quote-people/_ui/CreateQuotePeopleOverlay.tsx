import type { OverlayProps } from '@/shared/lib/overlay'
import type { IQuotePersonCreateRequest } from '@/shared/types'

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
  Input,
} from '@/shared/ui'

const formSchema = z.object({
  description: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
})

// Todo: Refactor Form Logic, Components
export const CreateQuotePeopleOverlay = ({ isOpen, close }: OverlayProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      description: '',
      name: '',
    },
    resolver: zodResolver(formSchema),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: async (input: IQuotePersonCreateRequest) => {
      ApiClient.quotePeople.create(input)
    },
  })
  const queryClient = useQueryClient()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => {
        showToast.success('Quote People created successfully!')
        queryClient.invalidateQueries({
          exact: false,
          queryKey: DpQueryKeys.admin.quotePeople.list(),
        })
        close()
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-6 p-4">
        <DialogTitle>Create Quote People</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant={'ghost'}
                disabled={isPending}
                onClick={close}
              >
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
