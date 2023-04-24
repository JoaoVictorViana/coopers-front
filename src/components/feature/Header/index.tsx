import { Button } from '@/components/core/Button'
import { API_ACCESS_TOKEN, apiGateway } from '@/configs/api'
import { me } from '@/fetchers/auth'
import { CookieManager } from '@/services/cookie'
import { useLoginModal } from '@/states/loginModal'
import { useUserInfo } from '@/states/user'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import { useQuery } from 'react-query'

export const Header = () => {
  const { open } = useLoginModal()
  const { username: user, setUsername } = useUserInfo()
  const { data } = useQuery(['user'], me, {
    enabled: new CookieManager().has(API_ACCESS_TOKEN),
  })

  const handleClick = useCallback(() => {
    if (user) {
      apiGateway.destroyTokens()
      setUsername('')
    }

    open()
  }, [user])

  useEffect(() => {
    if (!data) return

    setUsername(data.username)
  }, [data])

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
