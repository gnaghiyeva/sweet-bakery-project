import * as yup from 'yup'

export const progressSchema = yup.object().shape({
    progressCount:yup.number().required().integer().positive(),
    progressName:yup.string().required().min(3) 
})