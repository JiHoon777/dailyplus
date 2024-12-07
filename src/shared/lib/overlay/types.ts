export interface OverlayProps {
  isOpen: boolean
  close: () => void
}

export type CreateOverlayElement = (props: OverlayProps) => JSX.Element

export interface OverlayContextType {
  mount(id: string, element: React.ReactNode): void
  unmount(id: string): void
}

export class OverlayError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OverlayError'
  }
}
