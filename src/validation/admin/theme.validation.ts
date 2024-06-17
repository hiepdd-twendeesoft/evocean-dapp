import * as Yup from 'yup';

export const createThemeSchema = Yup.object()
  .shape({
    name: Yup.string()
    .required('Name is required'),
    overview: Yup.string()
    .required('Description is required'),
    selling_price: Yup.number()
    .required('Selling price is required'),
    owner_price: Yup.number()
    .required('owner price is required'),
    // previews: Yup.string()
    // .required('owner price is required'),
  })
  .required();


