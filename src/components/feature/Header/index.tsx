import { Button } from '@/components/core/Button'
import { apiGateway } from '@/configs/api'
import { useLoginModal } from '@/states/loginModal'
import { useUserInfo } from '@/states/user'
import Image from 'next/image'
import { useCallback } from 'react'

export const Header = () => {
  const { open } = useLoginModal()
  const { username: user, setUsername } = useUserInfo()

  const handleClick = useCallback(() => {
    if (user) {
      apiGateway.destroyTokens()
      setUsername('')
    }

    open()
  }, [user])

  return (
    <header className="Header" id="header">
      <div className="Header__container">
        <Image
          className="Header__logo"
          src="/images/logo.png"
          width={217}
          height={50}
          alt="Logo da Coopers"
        />
        <Button
          variant="secondary"
          className="Header__login"
          onClick={handleClick}
        >
          {user ? `${user}, logout` : 'Sign in'}
        </Button>
      </div>
    </header>
  )
}
