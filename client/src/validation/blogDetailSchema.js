import * as yup from 'yup'

export const blogdetailSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    
})