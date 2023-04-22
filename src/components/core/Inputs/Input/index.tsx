import { FC, InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label?: string
  helperText?: string
  error?: boolean
}

export const Input: FC<InputProps> = ({
  name,
  label,
  helperText,
  error,
  ...props
}) => {
  return (
    <div className="Input">
      {label && (
        <label
          className={`Input__label ${error && 'Input__label--error'}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        name={name}
        className={`Input__field ${error && 'Input__field--error'}`}
      />

      {helperText && (
        <span
          className={`Input__helperText ${error && 'Input__helperText--error'}`}
        >
          {helperText}
        </span>
      )}
    </div>
  )
}
