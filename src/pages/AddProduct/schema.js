import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required!'),
  author: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required!'),
  year: Yup.number()
    .min(1900, 'Minimum publish year is 1900!')
    .max(2023, 'Maximun publish year is 2023!')
    .required('This field is required!'),
  rating: Yup.number()
    .min(1, 'Minimum rating is 1!')
    .max(5, 'Maximun rating is 5!')
    .required('This field is required!'),
});
