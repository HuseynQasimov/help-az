import Joi from "joi";

export const appointmentValidation = Joi.object().keys({
    full_name: Joi.string().min(6).max(64).required(),
    service: Joi.string().required(),
    mobile_number: Joi.string().min(10).max(15).required(),
    address: Joi.string().min(6).max(124).required(),
    service_date: Joi.date().required(),
    promo_code: Joi.string().optional(),
    nearest_nurse: Joi.boolean().optional(),
});
