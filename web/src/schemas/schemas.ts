import * as yup from 'yup';
import { timeToMinutes } from '../services/time';
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

export const createParkingSchema = yup.object().shape({
  address: yup.string().required(errorMessages.required),
  size: yup.number().typeError(errorMessages.shouldBeNumber).required(errorMessages.required).min(10),
  tariffId: yup.string().required(errorMessages.required),
  floorCount: yup.number().required(errorMessages.required).min(1),
});

export const tariffSchema = yup.object().shape({
  name: yup.string().required(errorMessages.required),
  pricePerHour: yup.number().required(errorMessages.required).typeError(errorMessages.shouldBeNumber),
  startWorkingHours: yup
    .string()
    .required(errorMessages.required)
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, errorMessages.invalidTimeFormat),
  endWorkingHours: yup
    .string()
    .required(errorMessages.required)
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, errorMessages.invalidTimeFormat)
    .test('is-later', errorMessages.invalidEndTime, function (value) {
      const { startWorkingHours } = this.parent;
      if (!startWorkingHours || !value) return true;
      return timeToMinutes(value) > timeToMinutes(startWorkingHours);
    }),
  freeTime: yup.string().required(errorMessages.required),
});
