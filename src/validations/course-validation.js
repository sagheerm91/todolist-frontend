import * as Yup from "yup";

const courseSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  originalPrice: Yup.number()
  .typeError("Original Price be a number")
    .required("Original Price is Required")
    .min(0, "Original Price cannot be negative"),

  discountedPrice: Yup.number()
  .typeError("Discounted Price be a number")
    .required("Discounted Price is Required")
    .min(0, "Discounted Price cannot be negative"),

  image: Yup.mixed().required("An image is required"),
});

export default courseSchema;
