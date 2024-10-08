import * as Joi from 'joi';

export const environmentSchema = Joi.object({
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_CONNECTION_STRING: Joi.string().required(),
    APP_PORT: Joi.number().required(),
})