// validations/userValidation.js
import Joi from 'joi';


const userValidationSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phoneNumber: Joi.string().length(9).pattern(/^[0-9]+$/).required(),
    // שדות נוספים בהתאם לצורך
});

export default userValidationSchema;

