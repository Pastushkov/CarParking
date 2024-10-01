import * as yup from 'yup';
import { errorMessages } from './errors';
import { regex } from './regex';

export const loginSchema = yup.object().shape({
  phone: yup
    .string()
    .required(errorMessages.required)
    .max(15, errorMessages.max(15))
    .matches(regex.phone, errorMessages.phone),
  password: yup.string().required(errorMessages.required),
});
