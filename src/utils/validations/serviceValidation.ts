import Joi from "joi";

export const serviceValidation = Joi.object().keys({
    name: Joi.string().required(),
});
