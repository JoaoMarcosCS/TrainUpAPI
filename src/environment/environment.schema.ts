import * as Joi from 'joi';

export const environmentSchema = Joi.object({
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_CONNECTION_STRING: Joi.string().required(),
    APP_PORT: Joi.number().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    URL_CALLBACK_PROD: Joi.string().required(),
    URL_CALLBACK_LOCAL: Joi.string().required(),
    URL_CALLBACK_CODESPACE: Joi.string().required(),
    JWT_EXPIRES: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    REFRESH_JWT_EXPIRES: Joi.string().required(),
    REFRESH_JWT_SECRET: Joi.string().required(),
})