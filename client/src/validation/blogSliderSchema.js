import * as yup from 'yup'

export const blogSliderSchema = yup.object().shape({
    title:yup.string().required('title is require'),
    image:yup.string().required('image is require'),
    
})