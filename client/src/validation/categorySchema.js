import * as yup from 'yup'

export const categorySchema = yup.object().shape({
    name:yup.string().required('name is require'),
    count: yup.number().required('number is require').positive().integer()
   
})