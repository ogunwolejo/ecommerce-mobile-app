import {object, string, ref} from 'yup';


//schema
const emailSchema = object({
    email: string().email().required()
})

const passwordSchema = object({
    password:string().min(3).required()
})

const confirmPasswordSchema = object().shape({
    password:string().min(3).required(),
    confirmPassword:string().required().equals([ref('password')])
})

const isStringSchema = object({
    value:string().required()
})


// validate functions
export const validateEmail = async(email) => await emailSchema.validate({email}, { strict: true });
export const validatePassword = async(password) => await passwordSchema.validate({password}, { strict: true });
export const validateString = async(value) => await isStringSchema.validate({value}, { strict: true });
export const validateConfirmPassword = async(confirmPassword, password) => await confirmPasswordSchema.validate({password, confirmPassword}, {});







