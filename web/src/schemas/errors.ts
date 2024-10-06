export const errorMessages = {
  required: 'Field is required',
  max: (max: number) => `Length of field must be less or equal ${max}`,
  phone: 'Invalid phone number',
  shouldBeNumber: 'Value must be a number',
  invalidTimeFormat: 'Value must be a time',
  invalidEndTime: 'The end time should be later than the start time',
};
