import { toast } from 'sonner'

export const showToast = {
  error: (error: unknown) => {
    if (typeof error === 'string') {
      toast.error(error)
      return
    }

    toast.error(JSON.stringify(error))
  },
  info: (message: string) => {
    toast.info(message)
  },
  success: (message: string) => {
    toast.success(message)
  },
}
