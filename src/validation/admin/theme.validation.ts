import * as Yup from 'yup';

export const createThemeSchema = Yup.object()
  .shape({
    name: Yup.string().required('Name is required'),
    // linkPreview: Yup.string().required('Link peview is required'),
    thumbnail_link: Yup.string().required('Thumbnail is required'),
    overview: Yup.string().required('Description is required'),
    selling_price: Yup.string().required('Selling price is required'),
    owner_price: Yup.string().required('Owner price is required'),
    percentageOfOwnership: Yup.string().required(
      'Percentage of ownership  is required'
    )
  })
  .required();
