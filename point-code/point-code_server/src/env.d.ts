declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    SALT_ROUNDS: string;
    MONGODB_ATLAS_URL: string;
    COOKIE_SECRET_KEY: string;
    JWT_SECRET_KEY: string;
  }
}
