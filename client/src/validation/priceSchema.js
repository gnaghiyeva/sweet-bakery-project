import * as yup from 'yup'

export const priceSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    name:yup.string().required('name is require'),
    price:yup.number().required('price is require').integer().positive(),
    
   
})