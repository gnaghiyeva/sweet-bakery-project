import * as yup from 'yup'

export const CommentsValidation = yup.object().shape({
    name:yup.string().min(4).required('name is required'),
    email:yup.string().required('email is required'),
    review:yup.string().min(10),
    rating:yup.number().required()
})