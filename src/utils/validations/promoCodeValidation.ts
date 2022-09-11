import Joi from "joi";

export const promoCodeValidation = Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().length(10).required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
});
