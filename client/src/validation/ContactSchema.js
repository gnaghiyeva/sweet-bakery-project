import * as yup from 'yup'

export const ContactSchema = yup.object().shape({
    title:yup.string().min(5).required(),
    desc:yup.string(),
    address:yup.string().required(),
    city:yup.string().required(),
    phone:yup.string().required(),
    email:yup.string().required(),
    // timein:yup.string().required(),
    // timeout:yup.string().required(),
    // meridiem:yup.string().required(),
})