import { FC, InputHTMLAttributes } from 'react'
import PhoneInputBase from 'react-phone-input-2'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label?: string
  onPhoneChange?: (value: string) => void
  value?: string
  helperText?: string
  error?: boolean
}

export const PhoneInput: FC<InputProps> = ({
  label,
  name,
  onPhoneChange,
  value,
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

      <PhoneInputBase
        onChange={onPhoneChange}
        value={value}
        placeholder="Enter phone number"
        country="br"
        onlyCountries={['br']}
        masks={{
          br: '(..) ....-....',
        }}
        inputClass={`Input__field ${error && 'Input__field--error'}`}
        inputProps={{
          ...props,
          name,
        }}
        containerClass=""
        disableCountryGuess
        disableDropdown
        disableSearchIcon
        disableCountryCode
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
