import * as yup from 'yup'

export const sliderSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    title:yup.string().required('name is require'),
   
})