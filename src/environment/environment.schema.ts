import * as Joi from 'joi';

export const environmentSchema = Joi.object({
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_CONNECTION_STRING: Joi.string().required(),
    APP_PORT: Joi.number().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required()
})