

import Joi from 'joi';

const registrationSchema = Joi.object({
    userId: Joi.number().integer().required(),
    password: Joi.string().min(8).required(),
    userName: Joi.string().required(),
    address: Joi.string().required(),
    region: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(new RegExp('^[0-9]{9}$')).required()  });

export default registrationSchema;
