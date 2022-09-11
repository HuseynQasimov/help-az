import Joi from "joi";

export const nurseRegistrationValidation = Joi.object().keys({
    full_name: Joi.string().min(6).max(64).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    mobile_number: Joi.string().min(10).max(15).required(),
    address: Joi.string().min(6).max(124).required(),
    experience: Joi.string().min(4).max(10).required(),
    social_media: Joi.array().items(Joi.string()).optional(),
    photo: Joi.string().optional(),
});
