import { Button } from '@/components/core/Button'
import { Input } from '@/components/core/Inputs/Input'
import { PhoneInput } from '@/components/core/Inputs/Phone'
import { Textarea } from '@/components/core/Inputs/TextArea'
import { Formik, FormikProps } from 'formik'
import Image from 'next/image'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { contactUsSchemaDefault } from './config'

type Fields = {
  name: string
  email: string
  telephone: string
  message: string
}

export const ContactUs = () => {
  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    telephone: '',
    message: '',
  })
  const [submited, setSubmited] = useState(false)
  const formRef = useRef<FormikProps<Fields>>(null)

  const handleChangeField = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!formRef.current) return

      const name = e.target.getAttribute('name')
      const { value } = e.target

      if (!name) return

      setFields((prev) => ({ ...prev, [name]: value }))
      formRef.current.setFieldValue(name, value)
    },
    [formRef.current]
  )

  const handleChangeTelephone = useCallback(
    (value: string) => {
      if (!formRef.current) return

      setFields((prev) => ({ ...prev, telephone: value }))
      formRef.current.setFieldValue('telephone', value)
    },
    [formRef.current]
  )

  return (
    <section className="ContactUs">
      <Image
        src="/images/contactUs.png"
        alt="Contate-nos"
        width={191}
        height={191}
        className="ContactUs__image"
      />
      <Image
        className="ContactUs__border"
        src="/images/grafismo.png"
        width={166}
        height={23}
        alt="borda"
      />
      <Formik
        innerRef={formRef}
        validationSchema={contactUsSchemaDefault}
        initialValues={{
          name: '',
          email: '',
          telephone: '',
          message: '',
        }}
        onSubmit={() => setSubmited(true)}
      >
        {({ errors, handleBlur, touched, handleSubmit }) => (
          <form className="ContactUs__form" onSubmit={handleSubmit}>
            <div className="ContactUs__form-header">
              <Image
                className="ContactUs__form-email"
                src="/images/mail.png"
                width={60}
                height={60}
                alt="email icon"
              />
              <div className="">
                <h2 className="ContactUs__form-title">GET IN</h2>
                <h2 className="ContactUs__form-title ContactUs__form-title--bold">
                  TOUCH
                </h2>
              </div>
            </div>

            {!submited && (
              <>
                <Input
                  name="name"
                  label="Your name"
                  placeholder="type your name here..."
                  onChange={handleChangeField}
                  value={fields.name}
                />
                <div className="ContactUs__form-group">
                  <Input
                    name="email"
                    label="Email*"
                    placeholder="example@example.com"
                    onBlur={handleBlur}
                    helperText={
                      touched.email && errors.email ? errors.email : ''
                    }
                    error={touched.email && !!errors.email}
                    onChange={handleChangeField}
                    value={fields.email}
                  />
                  <PhoneInput
                    name="telephone"
                    label="Telephone*"
                    placeholder="(  ) ____-____"
                    onPhoneChange={handleChangeTelephone}
                    value={fields.telephone}
                    onBlur={handleBlur}
                    helperText={
                      touched.telephone && errors.telephone
                        ? errors.telephone
                        : ''
                    }
                    error={touched.telephone && !!errors.telephone}
                  />
                </div>
                <Textarea
                  name="message"
                  rows={5}
                  placeholder="Type what you want to say to us"
                  label="Message*"
                  onChange={handleChangeField}
                  onBlur={handleBlur}
                  value={fields.message}
                  helperText={
                    touched.message && errors.message ? errors.message : ''
                  }
                  error={touched.message && !!errors.message}
                />

                <Button type="submit" className="ContactUs__form-submit">
                  Send now
                </Button>
              </>
            )}

            {submited && (
              <div className="ContactUs__form-welcome">
                Thank you for contacting!
              </div>
            )}
          </form>
        )}
      </Formik>
    </section>
  )
}
