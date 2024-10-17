import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().default(false),

  JWT_SECRET: Joi.string().required(),

  AUTH0_DOMAIN: Joi.string().required(),
  AUTH0_CLIENT_ID: Joi.string().required(),
  AUTH0_CLIENT_SECRET: Joi.string().required(),
  AUTH0_CALLBACK_URL: Joi.string().uri().required(),

  STRIPE_SECRET_KEY: Joi.string().required(),
  STRIPE_API_KEY: Joi.string().required(),

  PAYPAL_CLIENT_ID: Joi.string().required(),
  PAYPAL_CLIENT_SECRET: Joi.string().required(),
  // Add other required variables here

  GTM_API_KEY: Joi.string().required(),
  APPSFLYER_API_KEY: Joi.string().required(),
});
