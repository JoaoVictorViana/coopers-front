import { ERROS_MESSAGES } from '@/configs/contants'
import * as yup from 'yup'

export const contactUsSchemaDefault = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .required(ERROS_MESSAGES.required)
    .email(ERROS_MESSAGES.email),
  telephone: yup
    .string()
    .required(ERROS_MESSAGES.required)
    .test('telephone', ERROS_MESSAGES.phone, (value) => {
      return value.length >= 10
    }),
  message: yup.string().required(ERROS_MESSAGES.required),
})
