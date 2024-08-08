import * as Yup from "yup";

export const createCollectionSchema = Yup.object()
  .shape({
    collection_name: Yup.string().required("Name is required"),
  })
  .required();
