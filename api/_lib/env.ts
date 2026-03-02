const requiredEnv = ["ADMIN_JWT_SECRET"];

export const getEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const validateCriticalEnv = (): void => {
  for (const key of requiredEnv) {
    if (!process.env[key]) {
      throw new Error(`Missing required env: ${key}`);
    }
  }
};
