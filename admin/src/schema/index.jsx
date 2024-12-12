import * as Yup from 'yup'

export const updatedProductSchema = Yup.object({
    title: Yup.string().min(2).max(25).required(),
    desc:Yup.string().required(),
    price:Yup.number().required(),
    inStock:Yup.bool().required()

});
export const createProductSchema = Yup.object({
    title: Yup.string().min(2).max(25).required(),
    desc:Yup.string().min(10).required("Description is required."),
    price:Yup.number().required(),
    inStock:Yup.bool().required(),
    color:Yup.array().min(1,"Atleast one color is required.").required(),
    cat:Yup.array().min(1,"Atleast one category is required.").required(),
    file:Yup.mixed().required("Image required")

});