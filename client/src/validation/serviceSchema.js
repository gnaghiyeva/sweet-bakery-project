import * as yup from 'yup'

export const serviceSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    title:yup.string().required('name is require'),
    description: yup.string().required('description is require')
   
})