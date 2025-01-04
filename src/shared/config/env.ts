export const DPEnvs = {
  appEnv: process.env.APP_ENV ?? 'dev',
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string,
}
