import * as yup from 'yup'

export const personSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    fullname:yup.string().required('name and surname is require'),
    
   
})