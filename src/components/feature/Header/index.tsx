import Image from 'next/image'

export const Header = () => {
  return (
    <header className="Header">
      <div className="Header__container">
        <Image
          className="Header__logo"
          src="/images/logo.png"
          width={217}
          height={50}
          alt="Logo da Coopers"
        />
        <button className="Header__login" onClick={() => console.log('opa')}>
          entrar
        </button>
      </div>
    </header>
  )
}
