import * as yup from 'yup'

export const blogSchema = yup.object().shape({
    title:yup.string().required('title is require'),
    releaseDate:yup.date().required(),
    description:yup.string().required(),
    color:yup.string().length(7,`color's length must be  7`).required(),
    image:yup.string().required('image is require'),
    
})