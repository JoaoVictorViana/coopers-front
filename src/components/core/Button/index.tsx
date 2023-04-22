import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'error'
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  variant,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`Button Button__${variant ?? 'primary'} ${
        props.className ?? ''
      }`}
    >
      {children}
    </button>
  )
}
