import { Button } from '@/components/core/Button'
import { useLoginModal } from '@/states/loginModal'
import Image from 'next/image'

export const Header = () => {
  const { open } = useLoginModal()

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
        <Button variant="secondary" className="Header__login" onClick={open}>
          Sign in
        </Button>
      </div>
    </header>
  )
}
