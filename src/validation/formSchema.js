// Here goes the schema for the form
import * as Yup from 'yup';

// define our schema
const stringSchema = Yup.string().strict()

const FormSchema = Yup.object().shape({
  username: Yup
    .string()
    .trim()
    .required()
    .min(3, "Username must be at least 3 characters"),
  email: Yup
    .string()
    .email()
    .required(),
  role: Yup
    .string()
    .oneOf(["instructor", "alumni", "student"], "Role is required"),
  civil: Yup
    .string()
    .oneOf(["single", "married"], "Civil status is required"),
  hiking: Yup.boolean(),
  reading: Yup.boolean(),
  coding: Yup.boolean(),
})

  // export default function testSchema() {
  //   stringSchema.isValid(12)
  //     .then(isValid => {
  //       console.log("is the stringSchema valid?", isValid)
  //     })
    
  //   formSchema.isValid({username: "kali"})
  //     .then(isValid => {
  //       console.log("is the object schema valid?", isValid)
  //     })

  //   const form = {username: "ka", email: 12}
  //   Yup.reach(formSchema, "username")
  //     .validate(form.username)
  //       .then(valid => console.log("yup.reach validate succeeded"))
  //       .catch(err => console.log(err))
  // }
    
export default FormSchema;