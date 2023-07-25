import * as yup from 'yup'

export const workSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    title:yup.string().required('name is require'),
    description: yup.string().required('description is require')
   
})