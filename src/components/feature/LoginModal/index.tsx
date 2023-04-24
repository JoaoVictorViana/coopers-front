import { Button } from '@/components/core/Button'
import { Input } from '@/components/core/Inputs/Input'
import { login } from '@/fetchers/auth'
import { useLoginModal } from '@/states/loginModal'
import Image from 'next/image'
import { ChangeEvent, useCallback, useState } from 'react'
import Modal from 'react-modal'

export const LoginModal = () => {
  const { visible, close } = useLoginModal()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [fields, setFields] = useState({
    username: '',
    password: '',
  })

  const handleChangeToRegister = useCallback(() => setMode('register'), [])
  const handleChangeField = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // if (!formRef.current) return

    const name = e.target.getAttribute('name')
    const { value } = e.target

    if (!name) return

    setFields((prev) => ({ ...prev, [name]: value }))
    // formRef.current.setFieldValue(name, value)
  }, [])

  const handleClose = useCallback(() => {
    close()
    setMode('login')
  }, [])

  const handleSubmit = useCallback(async () => {
    await login(fields.username, fields.password)

    close()
  }, [fields])

  return (
    <Modal
      isOpen={visible}
      onRequestClose={handleClose}
      className="Modal LoginModal"
      overlayClassName="Modal__overlay"
    >
      <span
        className="LoginModal__close"
        role="button"
        tabIndex={0}
        onKeyUp={handleClose}
        onClick={handleClose}
      >
        close
      </span>
      <div className="LoginModal__header">
        <Image
          src="/images/login.png"
          width={231}
          height={231}
          alt="Sign in image"
          className="LoginModal__header-image"
        />
        <div>
          <h2 className="LoginModal__header-title">
            {mode === 'login' ? 'Sign in' : 'Register'}
          </h2>
          <h2 className="LoginModal__header-description">
            to access your list
          </h2>
        </div>
      </div>
      <form className="LoginModal__form">
        <Input
          label="User:"
          name="username"
          onChange={handleChangeField}
          value={fields.username}
        />
        <Input
          label="Password:"
          name="password"
          type="password"
          onChange={handleChangeField}
          value={fields.password}
        />
        {mode === 'login' && (
          <span
            className="LoginModal__form-label"
            role="button"
            tabIndex={0}
            onKeyUp={handleChangeToRegister}
            onClick={handleChangeToRegister}
          >
            You dont have an account yet, register{' '}
            <a className="LoginModal__form-register">here</a>
          </span>
        )}
        <Button
          type="button"
          onClick={handleSubmit}
          className="LoginModal__form-submit"
        >
          {mode === 'login' ? 'Sign in' : 'Register'}
        </Button>
      </form>
    </Modal>
  )
}
