import * as Yup from 'yup'

export const registerUserSchema = Yup.object({
    name: Yup.string().min(2).max(25).required(),
    lastname: Yup.string().min(2).max(25).required(),
    username: Yup.string().min(2).max(25).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Password must match"),
})
export const loginUserSchema = Yup.object({
    username: Yup.string().min(2).max(25).required(),
    password: Yup.string().min(6).required(),
})
