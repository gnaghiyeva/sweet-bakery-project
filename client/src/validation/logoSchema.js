import * as yup from 'yup'

export const logoSchema = yup.object().shape({
    image:yup.string().required('image is require'),   
})