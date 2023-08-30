import * as yup from 'yup'

export const skillsSchema = yup.object().shape({
    title:yup.string().required().min(3),
    description:yup.string().required().min(3) 
})