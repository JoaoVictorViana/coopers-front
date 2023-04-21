import { KEYCODES } from '@/configs/contants'
import Image from 'next/image'
import { FC, HTMLProps, KeyboardEvent, useCallback, useRef } from 'react'

export const RadioInput: FC<HTMLProps<HTMLInputElement>> = ({ ...props }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClickContainer = useCallback(() => {
    if (!inputRef.current) return

    inputRef.current.click()
  }, [inputRef])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation()
      if (!inputRef.current) return

      if (e.code !== KEYCODES.ENTER) return

      inputRef.current.click()
    },
    [inputRef]
  )

  return (
    <div
      className="RadioInput"
      role="checkbox"
      aria-checked
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onTouchStart={handleClickContainer}
      onClick={handleClickContainer}
    >
      <input
        ref={inputRef}
        {...props}
        type="checkbox"
        className="RadioInput-input"
      />

      <span className="RadioInput-mark" />
      <span className="RadioInput-check">
        <Image
          width={12}
          height={8}
          alt="radio check"
          src="/images/core/check.png"
        />
      </span>
    </div>
  )
}
