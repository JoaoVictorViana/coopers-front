import Image from 'next/image'

export const Intro = () => {
  return (
    <section className="Intro" id="intro">
      <div className="Intro__content">
        <h1 className="Intro__content-title">Organize</h1>
        <h2 className="Intro__content-title--low">your daily jobs</h2>

        <span className="Intro__content-subtitle">
          The only way to get things done
        </span>

        <a
          className="Intro__content-button Button Button__primary"
          href="#describe"
        >
          Go to To-do list
        </a>
      </div>
      <div className="Intro__image-container">
        <Image
          src="/images/arrow-green.png"
          className="Intro__arrow"
          width={640}
          height={734}
          alt="Escritório de trabalho"
        />
        <Image
          src="/images/intro.png"
          className="Intro__image"
          width={443}
          height={482}
          alt="Escritório de trabalho"
        />
      </div>
    </section>
  )
}
