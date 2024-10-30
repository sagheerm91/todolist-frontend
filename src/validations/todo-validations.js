import * as Yup from "yup";

const todoSchema = Yup.object({
    task:Yup.string().required("Task is Required")
});

export default todoSchema;