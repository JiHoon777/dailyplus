import React from 'react'

export const ClickOutside = ({
  onClickOutside,
  children,
}: {
  onClickOutside: () => void
  children: React.ReactElement
}) => {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside])

  return React.cloneElement(children, {
    ref,
    className: children.props.className,
  })
}
