import { Button } from '@/components/core/Button'
import Image from 'next/image'

export const Header = () => {
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
          onClick={() => console.log('opa')}
        >
          entrar
        </Button>
      </div>
    </header>
  )
}
