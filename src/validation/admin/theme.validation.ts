import * as Yup from 'yup';

export const createThemeSchema = Yup.object()
  .shape({
    name: Yup.string().required('Name is required'),
    linkPreview: Yup.string().required('Link peview is required'),
    overview: Yup.string().required('Description is required'),
    selling_price: Yup.number().required('Selling price is required'),
    owner_price: Yup.number().required('Owner price is required'),
    percentageOfOwnership: Yup.string().required(
      'Percentage of ownership  is required'
    )
  })
  .required();
