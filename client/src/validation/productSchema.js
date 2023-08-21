import * as yup from 'yup'

export const productSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    title:yup.string().required('title is require'),
    price:yup.number().required('price is require').integer().positive(),
    priceDiscount:yup.number().integer().positive(),
    
   
})