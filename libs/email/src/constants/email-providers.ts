export const EmailProviderType = {
  SENDGRID: 'sendgrid',
  MAILGUN: 'mailgun',
} as const;

export type EmailProviderType =
  typeof EmailProviderType[keyof typeof EmailProviderType];

export const INJECTION_TOKENS = {
  EMAIL_PROVIDER: 'EMAIL_PROVIDER',
  TEMPLATE_ENGINE: 'TEMPLATE_ENGINE',
  TEMPLATE_REPOSITORY: 'TEMPLATE_REPOSITORY',
} as const;

export type INJECTION_TOKENS =
  typeof INJECTION_TOKENS[keyof typeof INJECTION_TOKENS];
