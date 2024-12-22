import type { OverlayProps } from '@/shared/lib/overlay'
import type { IQuotesCreationInput } from '@/shared/types'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { DpQueryKeys } from '@/shared/api'
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
  ModalOverlay,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui'

const formSchema = z.object({
  korean_text: z.string().min(2, {
    message: 'Korean text must be at least 2 characters.',
  }),
  original_text: z.string().min(2, {
    message: 'Original text must be at least 2 characters.',
  }),
  quote_person_id: z.number().min(1, {
    message: 'Quote person id must be at least 1.',
  }),
})

// Todo: Refactor Form Logic, Components
export const CreateQuotesOverlay = ({ isOpen, close }: OverlayProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      korean_text: '',
      original_text: '',
      quote_person_id: undefined,
    },
    resolver: zodResolver(formSchema),
  })

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (input: IQuotesCreationInput) => {
      ApiClientCSR.quotes.create(input)
    },
    onSuccess: () => {
      showToast.success('Quote created successfully!')
      queryClient.invalidateQueries({
        queryKey: DpQueryKeys.admin.quotes.list(),
      })
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
        <h3 className="text-lg font-semibold">Create Quotes</h3>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="korean_text"
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
            name="original_text"
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
            name="quote_person_id"
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
    </ModalOverlay>
  )
}
