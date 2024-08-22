import * as Yup from 'yup';

export const createCollectionSchema = Yup.object()
  .shape({
    collection_name: Yup.string().required('Name is required'),
    // linkPreview: Yup.string().required('Link peview is required'),
    thumbnail: Yup.string().required('Thumbnail is required'),
    description: Yup.string().required('Description is required'),
    sellingPricing: Yup.string().required('Selling price is required'),
    ownershipPrice: Yup.string().required('Owner price is required'),
    percentageOfOwnership: Yup.string().required(
      'Percentage of ownership  is required'
    )
  })
  .required();
