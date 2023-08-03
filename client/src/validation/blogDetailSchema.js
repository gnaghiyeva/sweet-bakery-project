import * as yup from 'yup'

export const blogdetailSchema = yup.object().shape({
    blogID:yup.string().required('blog id is require'),
    image:yup.string().required('image is require'),
    
})